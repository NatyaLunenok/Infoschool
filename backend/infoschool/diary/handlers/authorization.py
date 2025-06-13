from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.db import transaction
from diary.models import *
from diary.serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.utils import timezone
from rest_framework.exceptions import AuthenticationFailed


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        role_name = request.data.get('role')

        if role_name == 'Родитель':
            serializer = ParentRegistrationSerializer(data=request.data)
        elif role_name == 'Учитель':
            serializer = TeacherRegistrationSerializer(data=request.data)
        elif role_name == 'Ученик':
            serializer = StudentRegistrationSerializer(data=request.data)
        else:
            return Response(
                {"error": "Неверная роль пользователя"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if serializer.is_valid():
            try:
                with transaction.atomic():
                    user = serializer.save()
                    return Response(
                        {"message": f"{role_name.capitalize()} успешно зарегистрирован", "user_id": user.id},
                        status=status.HTTP_201_CREATED
                    )
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({"message": f"Привет, {request.user.username}! Это защищённый эндпоинт."})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Проверка refresh-токена
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                raise AuthenticationFailed("Недействительный refresh токен")

            # Проверка и блокировка access-токена
            access_token_raw = request.auth
            if not access_token_raw:
                raise AuthenticationFailed("Access токен не предоставлен")

            try:
                access_token = AccessToken(str(access_token_raw))
            except Exception as e:
                raise AuthenticationFailed("Недействительный access токен")

            # Пытаемся внести access-токен в blacklist (если он есть в OutstandingToken)
            outstanding_token = OutstandingToken.objects.filter(jti=access_token['jti']).first()
            if outstanding_token:
                BlacklistedToken.objects.get_or_create(token=outstanding_token)

            return Response({"message": "Успешный выход"}, status=status.HTTP_205_RESET_CONTENT)

        except AuthenticationFailed as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
