from django.db import models
from unicodedata import category
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class Role(models.Model):
    role_name = models.CharField(max_length=30, unique=True)


class User(AbstractUser):
    login = models.CharField(max_length=50, unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    USERNAME_FIELD = "login"  # Авторизация по login
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.login


class Specialization(models.Model):
    specialization_name = models.CharField(max_length=30, unique=True)


class Teacher(models.Model):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=50, unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=12, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)


class Class(models.Model):
    class_name = models.CharField(max_length=3)
    year_admission = models.IntegerField()
    specialization = models.ForeignKey(Specialization, on_delete=models.CASCADE)
    class_teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('class_name', 'year_admission')
        constraints = [
            models.CheckConstraint(
                name="Class_year_admission_checkConstraint",
                check=models.Q(year_admission__gte=2025) & models.Q(year_admission__lte=2225),
            ),
        ]

class ParentType(models.Model):
    type_name = models.CharField(max_length=7, unique=True)


class Parent(models.Model):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=12, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    parent_type = models.ForeignKey(ParentType, on_delete=models.CASCADE)


class Student(models.Model):
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=12, unique=True)
    address = models.CharField(max_length=200)
    birth_certificate_number = models.CharField(max_length=12, unique=True)
    email = models.EmailField(max_length=50, blank=True, null=True)
    photo = models.ImageField(upload_to='student_photo/', blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    parent1 = models.ForeignKey(Parent, on_delete=models.CASCADE, related_name='children_as_parent1')
    parent2 = models.ForeignKey(Parent, on_delete=models.CASCADE, blank=True, null=True, related_name='children_as_parent2')
    class_name = models.ForeignKey(Class, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.CheckConstraint(
                name="parents_not_equal",
                check=~models.Q(parent1=models.F('parent2')),
            ),
        ]


class Subject(models.Model):
    subject_name = models.CharField(max_length=30, unique=True)


class ClassroomType(models.Model):
    type_name = models.CharField(max_length=30, unique=True)


class Classroom(models.Model):
    classroom_number = models.IntegerField(primary_key=True)
    type = models.ForeignKey(ClassroomType, on_delete=models.CASCADE)


class Lesson(models.Model):
    date = models.DateField()
    lesson_number = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    class_name = models.ForeignKey(Class, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['date', 'lesson_number', 'class_name'],
                name='unique_lesson_class'
            ),
            models.UniqueConstraint(
                fields=['date', 'lesson_number', 'teacher'],
                name='unique_lesson_teacher'
            ),
            models.UniqueConstraint(
                fields=['date', 'lesson_number', 'classroom'],
                name='unique_lesson_classroom'
            ),
        ]


class Mark(models.Model):
    mark = models.IntegerField()
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.CheckConstraint(
                name="Mark_checkConstraint",
                check=models.Q(mark__gte=2) & models.Q(mark__lte=5),
            ),
        ]

class Schedule(models.Model):
    lesson_number = models.IntegerField(primary_key=True)
    lesson_start = models.TimeField()
    lesson_finish = models.TimeField()

    class Meta:
        unique_together = ('lesson_start', 'lesson_finish')

