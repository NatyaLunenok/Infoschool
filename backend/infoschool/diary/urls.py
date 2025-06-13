from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .handlers.authorization import *
from .handlers.teacher_journal import *


urlpatterns = ([
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('subject/', SubjectListView.as_view(), name='subject-list'),
    path('class/', ClassListView.as_view(), name='class-list'),
    path('homeworks/', HomeworkListView.as_view(), name='homework-list'),
    path('homework/', HomeworkView.as_view(), name='homework-create'),
    path('homework/<int:homework_id>/', HomeworkView.as_view(), name='homework-detail'),
    path('journal/', ElectronicJournalView.as_view(), name='electronic-journal'),
    path('marks/', MarkCreateView.as_view(), name='mark-create'),
    path('marks/<int:pk>/', MarkDestroyView.as_view(), name='mark-delete'),
])
