from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from datetime import timedelta, date
from diary.models import *
from diary.serializers import *


class ParentChildrenView(APIView):
    def get(self, request, format=None):
        parent_id_str = request.query_params.get('parent_id')

        if not parent_id_str:
            return Response({'error': 'Необходимо указать parent_id.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            parent_id = int(parent_id_str)
            parent = get_object_or_404(Parent, pk=parent_id)
        except (ValueError, Parent.DoesNotExist):
            return Response({'error': 'Неверный parent_id или родитель не найден.'}, status=status.HTTP_404_NOT_FOUND)

        children = Student.objects.filter(parent1=parent) | Student.objects.filter(parent2=parent)

        serializer = ChildSerializer(children, many=True)
        return Response(serializer.data)
