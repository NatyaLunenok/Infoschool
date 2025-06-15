from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .handlers.authorization import *
from .handlers.teacher_journal import *
from .handlers.admin_managment import *
from .handlers.teacher_schedule import *
from .handlers.parent_page import *
from .handlers.headteacher_page import *
from .handlers.student_page import *



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
    path('current-marks/create/', MarkCreateView.as_view(), name='mark-create'),
    path('marks/<int:pk>/', MarkDestroyView.as_view(), name='mark-delete'),
    path('classroom/', ClassroomListView.as_view(), name='classroom-list'),
    path('parent/', ParentListView.as_view(), name='parent-list'),
    path('teacher/', TeacherListView.as_view(), name='teacher-list'),
    path('student/', StudentListView.as_view(), name='student-list'),
    path('teacher-schedule/', TeacherScheduleView.as_view(), name='teacher-schedule'),
    path('class-schedule/', ClassScheduleView.as_view(), name='class-schedule'),
    path('full-name/', FullNameWithIdView.as_view(), name='full-name'),
    path('children/', ParentChildrenView.as_view(), name='parent-children'),
    path('specialization/', SpecializationListView.as_view(), name='specialization-list'),
    path('teacher-list/', TeachersListView.as_view(), name='teachers-list'),
    path('classes/<int:class_id>/', ClassDetailView.as_view(), name='class-detail'),
    path('classes/add-student/', AddStudentToClassView.as_view(), name='add-student-to-class'),
    path('classes/student-info/<int:student_id>/', StudentDetailView.as_view(), name='student-info'),
    path('lessons/', SimpleLessonListView.as_view(), name='lesson-list'),
    path('student-marks/', StudentMarksView.as_view(), name='student-marks'),
    path('student-final-marks/', StudentFinalMarksView.as_view(), name='student-final-marks'),

])
