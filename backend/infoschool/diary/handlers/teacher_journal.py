from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db.models import Prefetch
from datetime import date
import os
from django.db import transaction
from diary.models import *
from diary.serializers import *

class SubjectListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Предметы не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class ClassListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Class.objects.all()
    serializer_class = ClassSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Классы не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HomeworkListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LessonHomeworkSerializer

    def get_queryset(self):
        subject_id = self.request.query_params.get('subject_id')
        class_id = self.request.query_params.get('class_id')
        quarter = self.request.query_params.get('quarter')

        if not subject_id or not class_id or not quarter:
            return Lesson.objects.none()

        return Lesson.objects.filter(
            subject_id=subject_id,
            class_name_id=class_id,
            quarter_number=quarter
        ).prefetch_related(
            Prefetch('homework_assignment', queryset=Homework.objects.all())
        )

    def list(self, request, *args, **kwargs):
        subject_id = request.query_params.get('subject_id')
        class_id = request.query_params.get('class_id')
        quarter = self.request.query_params.get('quarter')


        if not subject_id or not class_id or not quarter:
            return Response(
                {'error': 'Необходимо указать subject_id, class_id и quarter.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {'message': 'Уроки для указанного класса и предмета не найдены.'},
                status=status.HTTP_200_OK
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class HomeworkView(APIView):
    permission_classes = [permissions.IsAuthenticated]


    @transaction.atomic
    def get(self, request, homework_id):
        try:
            homework = Homework.objects.select_related(
                'lesson', 'lesson__subject', 'lesson__teacher'
            ).prefetch_related('files').get(pk=homework_id)

            serializer = HomeworkDetailSerializer(homework)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Homework.DoesNotExist:
            return Response(
                {"error": "Домашнее задание не найдено"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @transaction.atomic
    def post(self, request):
        try:
            homework_data = {
                'lesson': request.data.get('lesson'),
                'description': request.data.get('description')
            }

            serializer = HomeworkCreateUpdateSerializer(data=homework_data)
            if serializer.is_valid():
                lesson_id = homework_data['lesson']

                try:
                    lesson = Lesson.objects.get(pk=lesson_id)
                except Lesson.DoesNotExist:
                    return Response(
                        {"error": "Урок не найден"},
                        status=status.HTTP_404_NOT_FOUND
                    )

                if Homework.objects.filter(lesson_id=lesson_id).exists():
                    return Response(
                        {"error": "Домашнее задание для этого урока уже существует"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                homework = serializer.save()

                files = request.FILES.getlist('files')
                for file in files:
                    HomeworkFile.objects.create(
                        homework=homework,
                        file=file
                    )

                lesson.homework = homework.description
                lesson.save()

                return Response(
                    {
                        "message": "Домашнее задание успешно создано",
                        "id": homework.id,
                        "files_count": len(files)
                    },
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    @transaction.atomic
    def put(self, request, homework_id):
        try:
            homework = Homework.objects.get(pk=homework_id)

            homework_data = {
                'description': request.data.get('description'),
                'lesson': homework.lesson.id
            }

            serializer = HomeworkCreateUpdateSerializer(
                instance=homework,
                data=homework_data,
                partial=True
            )

            if serializer.is_valid():
                lesson = homework.lesson
                if 'description' in homework_data:
                    lesson.homework = homework_data['description']
                    lesson.save()

                new_files = request.FILES.getlist('new_files')
                for file in new_files:
                    HomeworkFile.objects.create(
                        homework=homework,
                        file=file
                    )

                files_to_delete = request.data.getlist('files_to_delete')
                for file_id in files_to_delete:
                    try:
                        file_obj = HomeworkFile.objects.get(id=file_id, homework=homework)
                        if file_obj.file:
                            if os.path.isfile(file_obj.file.path):
                                os.remove(file_obj.file.path)
                        file_obj.delete()
                    except HomeworkFile.DoesNotExist:
                        continue

                serializer.save()

                files_serializer = HomeworkFileSerializer(
                    homework.files.all(),
                    many=True
                )

                return Response(
                    {
                        "message": "Домашнее задание успешно обновлено",
                        "files": files_serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Homework.DoesNotExist:
            return Response(
                {"error": "Домашнее задание не найдено"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @transaction.atomic
    def delete(self, request, homework_id):
        try:
            homework = Homework.objects.get(pk=homework_id)
            lesson = homework.lesson

            # Удаляем связанные файлы
            files = homework.files.all()
            for file in files:
                if file.file:
                    if os.path.isfile(file.file.path):
                        os.remove(file.file.path)
                file.delete()

            lesson.homework = None
            lesson.save()

            homework.delete()
            return Response(
                {"message": "Домашнее задание успешно удалено"},
                status=status.HTTP_204_NO_CONTENT
            )

        except Homework.DoesNotExist:
            return Response(
                {"error": "Домашнее задание не найдено"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "Произошла ошибка при удалении домашнего задания"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ElectronicJournalView(ListAPIView):
    serializer_class = StudentJournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        class_id = request.query_params.get('class_id')
        subject_id = request.query_params.get('subject_id')
        quarter = request.query_params.get('quarter')
        year = request.query_params.get('year')

        if not class_id or not subject_id or not quarter or not year:
            return Response(
                {"error": "Необходимо указать class_id, subject_id, quarter и year"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            year = int(year)
            queryset = self.get_queryset(class_id, subject_id, quarter, year)

            if not queryset.exists():
                return Response(
                    {"message": "Данные не найдены для указанного класса, предмета и четверти."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_queryset(self, class_id, subject_id, quarter, year):
        if not quarter or int(quarter) not in range(1, 5):
            raise ValueError("Номер четверти должен быть от 1 до 4")

        start_date = date(year, 9, 1)
        end_date = date(year + 1, 5, 31)

        return Student.objects.filter(
            class_name_id=class_id
        ).select_related('class_name').prefetch_related(
            Prefetch(
                'mark_set',
                queryset=Mark.objects.filter(
                    lesson__subject_id=subject_id,
                    quarter_number=quarter,
                    lesson__date__range = (start_date, end_date)
                ).select_related('lesson', 'lesson__subject'),
                to_attr='filtered_marks'
            )
        )


class MarkCreateView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Mark.objects.all()
    serializer_class = MarkCreateUpdateSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            lesson_id = request.data.get('lesson')
            student_id = request.data.get('student')

            if not Lesson.objects.filter(pk=lesson_id).exists():
                return Response(
                    {"error": "Урок с указанным ID не найден"},
                    status=status.HTTP_404_NOT_FOUND
                )

            if not Student.objects.filter(pk=student_id).exists():
                return Response(
                    {"error": "Студент с указанным ID не найден"},
                    status=status.HTTP_404_NOT_FOUND
                )

            self.perform_create(serializer)

            return Response(
                {
                    "message": "Оценка успешно добавлена",
                },
                status=status.HTTP_201_CREATED
            )

        except serializers.ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"error": "Произошла ошибка при создании оценки."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class MarkDestroyView(DestroyAPIView):
    queryset = Mark.objects.all()
    serializer_class = MarkCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(
                {"message": "Оценка успешно удалена."},
                status=status.HTTP_200_OK  # Изменено с 204 на 200 для возможности возврата тела ответа
            )

        except ObjectDoesNotExist:
            return Response(
                {"error": "Оценка не найдена."},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"error": "Произошла ошибка при удалении оценки."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SimpleLessonListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        class_id = request.query_params.get('class_id')
        subject_id = request.query_params.get('subject_id')
        quarter = request.query_params.get('quarter')

        if not all([class_id, subject_id, quarter]):
            return Response(
                {"error": "Необходимо указать class_id, subject_id и quarter"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quarter = int(quarter)
            if quarter not in [1, 2, 3, 4]:
                raise ValueError
        except ValueError:
            return Response(
                {"error": "Номер четверти должен быть целым числом от 1 до 4"},
                status=status.HTTP_400_BAD_REQUEST
            )


        lessons = Lesson.objects.filter(
            class_name_id=class_id,
            subject_id=subject_id,
            quarter_number=quarter
        ).order_by('date')

        serializer = LessonListSerializer(lessons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)