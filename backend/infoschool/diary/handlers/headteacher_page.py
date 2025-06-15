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
