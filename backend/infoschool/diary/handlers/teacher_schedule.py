from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from datetime import timedelta, date
from diary.models import *
from diary.serializers import *


class TeacherScheduleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        teacher_id = request.query_params.get('teacher')
        date_str = request.query_params.get('date')

        if not teacher_id or not date_str:
            return Response({'error': 'Необходимо указать teacher_id и дату.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            teacher = get_object_or_404(Teacher, id=teacher_id)
        except Teacher.DoesNotExist:
            return Response({'error': 'Учитель не найден.'},
                            status=status.HTTP_404_NOT_FOUND)

        try:
            date_obj = date.fromisoformat(date_str)
        except ValueError:
            return Response({'error': 'Неверный формат даты. Используйте YYYY-MM-DD.'},
                            status=status.HTTP_400_BAD_REQUEST)

        start_of_week = date_obj - timedelta(days=date_obj.weekday())
        end_of_week = start_of_week + timedelta(days=6)

        lessons = Lesson.objects.filter(
            teacher=teacher,
            date__range=(start_of_week, end_of_week)
        ).order_by('date', 'lesson_number')

        schedule = {}
        for lesson in lessons:
            date_key = lesson.date.isoformat()
            if date_key not in schedule:
                schedule[date_key] = []
            schedule[date_key].append(LessonSerializer(lesson).data)

        return Response(schedule)


class ClassScheduleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        class_id_str = request.query_params.get('class_id')
        date_str = request.query_params.get('date')

        if not class_id_str or not date_str:
            return Response({'error': 'Необходимо указать class_id и дату.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            class_id = int(class_id_str)
            class_obj = get_object_or_404(Class, pk=class_id)
        except (ValueError, Class.DoesNotExist):
            return Response({'error': 'Неверный class_id или класс не найден.'},
                            status=status.HTTP_404_NOT_FOUND)

        try:
            date_obj = date.fromisoformat(date_str)
        except ValueError:
            return Response({'error': 'Неверный формат даты. Используйте YYYY-MM-DD.'},
                            status=status.HTTP_400_BAD_REQUEST)

        start_of_week = date_obj - timedelta(days=date_obj.weekday())
        end_of_week = start_of_week + timedelta(days=6)


        lessons = Lesson.objects.filter(
            class_name=class_obj,
            date__range=(start_of_week, end_of_week)
        ).select_related(
            'subject',
            'classroom',
            'teacher'
        ).prefetch_related(
            'homework_assignment'
        ).order_by('date', 'lesson_number')


        schedule = {}
        for lesson in lessons:
            date_key = lesson.date.isoformat()
            if date_key not in schedule:
                schedule[date_key] = []
            schedule[date_key].append(ScheduleForClassSerializer(lesson).data)

        return Response(schedule)