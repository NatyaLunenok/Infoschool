from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db.models import Prefetch
from datetime import timedelta, date
import os
from django.db import transaction
from diary.models import *
from diary.serializers import *


class StudentMarksView(APIView):
    def get(self, request, format=None):
        student_id_str = request.query_params.get('student_id')
        date_str = request.query_params.get('date')

        if not student_id_str or not date_str:
            return Response({'error': 'Необходимо указать student_id и дату.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            student_id = int(student_id_str)
            student = get_object_or_404(Student, pk=student_id)
        except (ValueError, Student.DoesNotExist):
            return Response({'error': 'Неверный student_id или ученик не найден.'},
                            status=status.HTTP_404_NOT_FOUND)

        try:
            date_obj = date.fromisoformat(date_str)
        except ValueError:
            return Response({'error': 'Неверный формат даты. Используйте YYYY-MM-DD.'},
                            status=status.HTTP_400_BAD_REQUEST)

        start_of_week = date_obj - timedelta(days=date_obj.weekday())
        end_of_week = start_of_week + timedelta(days=6)

        try:
            default_mark_type = MarkType.objects.get(type_name='Текущая оценка')
        except MarkType.DoesNotExist:
            return Response({'error': 'Тип оценки "Текущая оценка" не найден.'}, status=status.HTTP_404_NOT_FOUND)

        marks = Mark.objects.filter(
            student=student,
            lesson__date__range=(start_of_week, end_of_week),
            mark_type=default_mark_type
        ).order_by('lesson__date', 'lesson__subject')

        schedule = {}
        for mark in marks:
            date_key = mark.lesson.date.isoformat()
            subject_key = mark.lesson.subject.subject_name
            if date_key not in schedule:
                schedule[date_key] = {}
            if subject_key not in schedule[date_key]:
                schedule[date_key][subject_key] = []
            schedule[date_key][subject_key].append(MarkSerializer(mark).data)

        return Response(schedule)


class StudentFinalMarksView(APIView):
    def get(self, request, format=None):
        student_id_str = request.query_params.get('student_id')
        year_str = request.query_params.get('year')

        if not student_id_str or not year_str:
            return Response({'error': 'Необходимо указать student_id и год.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            student_id = int(student_id_str)
            student = get_object_or_404(Student, pk=student_id)
            year = int(year_str)
        except (ValueError, Student.DoesNotExist):
            return Response({'error': 'Неверный student_id или год, или ученик не найден.'},
                            status=status.HTTP_404_NOT_FOUND)


        try:
            quarter_mark_type = MarkType.objects.get(type_name='Четвертная оценка')
            year_mark_type = MarkType.objects.get(type_name='Годовая оценка')
        except MarkType.DoesNotExist:
            return Response({'error': 'Типы оценок "Четвертная оценка" или "Годовая оценка" не найдены.'}, status=status.HTTP_404_NOT_FOUND)



        final_marks = FinalMark.objects.filter(
            student=student,
            year=year,
            mark_type__in=[quarter_mark_type, year_mark_type]
        ).order_by('subject')


        # Группируем оценки по предметам
        marks_by_subject = {}
        for mark in final_marks:
            subject_name = mark.subject.name
            if subject_name not in marks_by_subject:
                marks_by_subject[subject_name] = []
            marks_by_subject[subject_name].append({
                "mark_type": mark.mark_type.type_name,
                "quarter_number": mark.quarter_number,
                "mark": mark.mark
            })


        return Response(marks_by_subject)