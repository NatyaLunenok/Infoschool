from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db.models import Prefetch
from datetime import datetime
import os
from django.db import transaction
from diary.models import *
from diary.serializers import *


class SpecializationListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Специализации не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TeachersListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Teacher.objects.all()
    serializer_class = TeacherForListSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Учителя не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ClassDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, class_id):
        try:
            class_obj = Class.objects.select_related(
                'specialization',
                'class_teacher'
            ).prefetch_related(
                'student_set'
            ).get(pk=class_id)

            serializer = ClassDetailSerializer(class_obj)
            return Response(serializer.data)

        except Class.DoesNotExist:
            return Response(
                {"error": "Класс не найден"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AddStudentToClassView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = StudentToClassSerializer(data=request.data)

        if serializer.is_valid():
            try:
                student = serializer.validated_data['student']
                class_obj = serializer.validated_data['class_obj']


                student.class_name = class_obj
                student.save()

                return Response(
                    {
                        "message": f"Ученик {student.last_name} {student.first_name} успешно добавлен в класс {class_obj.class_name}"
                    },
                    status=status.HTTP_200_OK
                )

            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, student_id):
        try:
            student = Student.objects.get(pk=student_id)
            serializer = StudentSerializer(student, context={'request': request})

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Student.DoesNotExist:
            return Response({"error": "Ученик не найден"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
