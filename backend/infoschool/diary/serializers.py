from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from django.utils import timezone
from rest_framework.reverse import reverse
from django.conf import settings


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.SlugRelatedField(
        queryset=Role.objects.all(),
        slug_field='role_name',
        required=True
    )

    class Meta:
        model = User
        fields = ("username", "password", "password2", "role")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})
        return attrs


class StudentRegistrationSerializer(UserRegistrationSerializer):
    # Поля для Student
    last_name = serializers.CharField(max_length=100, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    patronymic = serializers.CharField(max_length=100, required=False, allow_null=True)
    phone_number = serializers.CharField(max_length=12, required=True)
    birth_date = serializers.DateField(required=True)
    address = serializers.CharField(max_length=200, required=True)
    birth_certificate_number = serializers.CharField(max_length=12, required=True)
    email = serializers.EmailField(max_length=50, required=False, allow_null=True)
    parent1_id = serializers.PrimaryKeyRelatedField(
        queryset=Parent.objects.all(),
        required=True,
        source='parent1'
    )
    parent2_id = serializers.PrimaryKeyRelatedField(
        queryset=Parent.objects.all(),
        required=False,
        allow_null=True,
        source='parent2'
    )

    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + (
            "last_name", "first_name", "patronymic", "phone_number",
            "birth_date", "address", "birth_certificate_number", "email",
            "parent1_id", "parent2_id"
        )

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if attrs.get('parent2') and attrs['parent1'] == attrs['parent2']:
            raise serializers.ValidationError({"parent": "Родители не могут быть одинаковыми"})
        return attrs

    def create(self, validated_data):
        # Извлекаем данные для Student
        student_data = {
            'last_name': validated_data['last_name'],
            'first_name': validated_data['first_name'],
            'patronymic': validated_data.get('patronymic'),
            'phone_number': validated_data['phone_number'],
            'birth_date': validated_data['birth_date'],
            'address': validated_data['address'],
            'birth_certificate_number': validated_data['birth_certificate_number'],
            'email': validated_data.get('email'),
            'parent1': validated_data['parent1'],
            'parent2': validated_data.get('parent2'),
            'class_name': None  # Класс остается пустым
        }

        # Создаем пользователя
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )

        # Создаем студента
        student = Student.objects.create(user=user, **student_data)
        return user


class TeacherRegistrationSerializer(UserRegistrationSerializer):
    # Поля для Teacher
    last_name = serializers.CharField(max_length=100, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    patronymic = serializers.CharField(max_length=100, required=False, allow_null=True)
    phone_number = serializers.CharField(max_length=12, required=True)
    email = serializers.EmailField(max_length=50, required=False, allow_null=True)

    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + (
            "last_name", "first_name", "patronymic", "phone_number", "email"
        )

    def create(self, validated_data):
        # Извлекаем данные для Teacher
        teacher_data = {
            'last_name': validated_data['last_name'],
            'first_name': validated_data['first_name'],
            'patronymic': validated_data.get('patronymic'),
            'phone_number': validated_data['phone_number'],
            'email': validated_data.get('email')
        }

        # Создаем пользователя
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )

        # Создаем учителя
        teacher = Teacher.objects.create(user=user, **teacher_data)
        return user


class ParentRegistrationSerializer(UserRegistrationSerializer):
    # Поля для Parent
    last_name = serializers.CharField(max_length=100, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    patronymic = serializers.CharField(max_length=100, required=False, allow_null=True)
    phone_number = serializers.CharField(max_length=12, required=True)
    parent_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ParentType.objects.all(),
        required=True,
        source='parent_type'
    )

    class Meta(UserRegistrationSerializer.Meta):
        fields = UserRegistrationSerializer.Meta.fields + (
            "last_name", "first_name", "patronymic", "phone_number", "parent_type_id"
        )

    def create(self, validated_data):
        # Извлекаем данные для Parent
        parent_data = {
            'last_name': validated_data['last_name'],
            'first_name': validated_data['first_name'],
            'patronymic': validated_data.get('patronymic'),
            'phone_number': validated_data['phone_number'],
            'parent_type': validated_data['parent_type']
        }

        # Создаем пользователя
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )

        # Создаем родителя
        parent = Parent.objects.create(user=user, **parent_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    User = get_user_model()
    username_field = 'username'  # Указываем, что используем email

    def validate(self, attrs):
        credentials = {
            'username': attrs.get('username'),
            'password': attrs.get('password')
        }
        user = User.objects.filter(username=credentials['username']).first()

        if user and user.check_password(credentials['password']):

            # Создаём refresh-токен (он автоматически регистрируется в OutstandingToken)
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            # Проверяем, нет ли дубликата access-токена, и добавляем его
            if not OutstandingToken.objects.filter(jti=access['jti']).exists():
                OutstandingToken.objects.create(
                    user=user,
                    token=str(access),
                    jti=access['jti'],
                    expires_at=timezone.make_aware(timezone.datetime.fromtimestamp(access['exp'])),
                    created_at=timezone.now()
                )

            # Формируем ответ
            data = {
                'refresh': str(refresh),
                'access': str(access),
                'username': user.username,
                'role': user.role.role_name
            }
            return data
        else:
            raise serializers.ValidationError('Неверный логин или пароль')


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'subject_name']
        
        
class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'class_name']


class HomeworkFileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeworkFile
        fields = ['id', 'file_url']

    def get_file_url(self, obj):
        return obj.file.url if obj.file else None


class LessonHomeworkSerializer(serializers.ModelSerializer):
    homework_id = serializers.SerializerMethodField()
    date = serializers.DateField(format='%Y-%m-%d')

    class Meta:
        model = Lesson
        fields = ['id', 'date', 'homework_id']

    def get_homework_id(self, obj):
        return getattr(obj, 'homework_assignment', None) and obj.homework_assignment.id


class LessonForHomeworkSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.subject_name')
    teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['date', 'subject_name', 'teacher_name']
        read_only_fields = fields

    def get_teacher_name(self, obj):
        last_name = obj.teacher.last_name
        first_name_initial = obj.teacher.first_name[0] + '.' if obj.teacher.first_name else ''
        patronymic_initial = obj.teacher.patronymic[0] + '.' if obj.teacher.patronymic else ''

        return f"{last_name} {first_name_initial}{' ' if patronymic_initial else ''}{patronymic_initial}".strip()


class HomeworkDetailSerializer(serializers.ModelSerializer):
    lesson = LessonForHomeworkSerializer(read_only=True)
    files = HomeworkFileSerializer(many=True, read_only=True)

    class Meta:
        model = Homework
        fields = ['id', 'description', 'lesson', 'files']
        read_only_fields = fields


class HomeworkCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ['id', 'lesson', 'description']
        extra_kwargs = {
            'lesson': {'required': True}
        }


class MarkJournalSerializer(serializers.ModelSerializer):
    date = serializers.DateField(source='lesson.date', format='%Y-%m-%d')
    lesson_id = serializers.IntegerField(source='lesson.id')

    class Meta:
        model = Mark
        fields = ['id', 'lesson_id', 'date', 'mark']


class StudentJournalSerializer(serializers.ModelSerializer):
    grades = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'last_name', 'first_name', 'grades']

    def get_grades(self, obj):
        marks = getattr(obj, 'filtered_marks', [])
        return MarkJournalSerializer(marks, many=True).data


class MarkCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ['id', 'mark', 'lesson', 'student', 'quarter_number']
    def validate_mark(self, value):
        if not (2 <= value <= 5):
            raise serializers.ValidationError("Оценка должна быть целым числом от 2 до 5.")
        return value

    def create(self, validated_data):
        mark_type, _ = MarkType.objects.get_or_create(
            id=1,
            defaults={'type_name': 'Текущая оценка'}
        )

        # Добавляем mark_type в validated_data
        validated_data['mark_type'] = mark_type

        return super().create(validated_data)


class ClassroomSerializer(serializers.ModelSerializer):
    type_id = serializers.IntegerField(source='type.id')
    type_name = serializers.CharField(source='type.type_name')

    class Meta:
        model = Classroom
        fields = ['classroom_number', 'type_id', 'type_name']


class ParentSerializer(serializers.ModelSerializer):
    type_name = serializers.CharField(source='parent_type.type_name')

    class Meta:
        model = Parent
        fields = ['id', 'last_name', 'first_name', 'patronymic', 'phone_number', 'type_name']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'last_name', 'first_name', 'patronymic', 'email', 'phone_number']


class StudentSerializer(serializers.ModelSerializer):
    parent1 = serializers.SerializerMethodField()
    parent2 = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'last_name', 'first_name', 'patronymic', 'birth_date',
                  'email', 'phone_number', 'address', 'birth_certificate_number',
                  'parent1', 'parent2']

    def get_parent_full_name(self, parent):
        if not parent:
            return None

        parts = [parent.last_name]

        if parent.first_name:
            parts.append(parent.first_name)

        if parent.patronymic:
            parts.append(parent.patronymic)

        return ' '.join(parts)

    def get_parent1(self, obj):
        return self.get_parent_full_name(obj.parent1)

    def get_parent2(self, obj):
        return self.get_parent_full_name(obj.parent2)


class LessonSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.subject_name')
    class_name = serializers.CharField(source='class_name.class_name')
    classroom_number = serializers.CharField(source='classroom.classroom_number')

    class Meta:
        model = Lesson
        fields = ['id', 'lesson_number', 'subject_name', 'class_name', 'classroom_number']

class ScheduleForClassSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.subject_name')
    teacher_name = serializers.SerializerMethodField()
    classroom_number = serializers.CharField(source='classroom.classroom_number')
    homework_id = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'lesson_number', 'subject_name', 'teacher_name', 'classroom_number', 'homework_id']

    def get_teacher_name(self, obj):
        last_name = obj.teacher.last_name
        first_name_initial = obj.teacher.first_name[0] + '.' if obj.teacher.first_name else ''
        patronymic_initial = obj.teacher.patronymic[0] + '.' if obj.teacher.patronymic else ''

        return f"{last_name} {first_name_initial}{' ' if patronymic_initial else ''}{patronymic_initial}".strip()

    def get_homework_id(self, obj):
        if hasattr(obj, 'homework_assignment'):
            return obj.homework_assignment.id
        return None

class FullNameWithIdSerializer(serializers.Serializer):
    full_name = serializers.CharField()
    user_id = serializers.IntegerField(source='user.id') # ID пользователя
    parent_id = serializers.IntegerField(source='parent.id', allow_null=True)
    teacher_id = serializers.IntegerField(source='teacher.id', allow_null=True)
    student_id = serializers.IntegerField(source='student.id', allow_null=True)
    class_id = serializers.IntegerField(source='student.class_name.id', allow_null=True)


class ChildSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class_name_id = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'full_name', 'class_name_id']

    def get_full_name(self, obj):
        return f"{obj.last_name} {obj.first_name} {obj.patronymic or ''}".strip()

    def get_class_name_id(self, obj):
        return obj.class_name.id if obj.class_name else None


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ['id', 'specialization_name']


class TeacherForListSerializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()
    class Meta:
        model = Teacher
        fields = ['id', 'teacher_name']

    def get_teacher_name(self, obj):
        return f"{obj.last_name} {obj.first_name} {obj.patronymic or ''}".strip()


class StudentShortSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'full_name']

    def get_full_name(self, obj):
        parts = [obj.last_name, obj.first_name]
        if obj.patronymic:
            parts.append(obj.patronymic)
        return ' '.join(parts)


class ClassDetailSerializer(serializers.ModelSerializer):
    students = StudentShortSerializer(many=True, source='student_set')
    class_teacher_name = serializers.SerializerMethodField()
    specialization_name = serializers.CharField(source='specialization.specialization_name')

    class Meta:
        model = Class
        fields = [
            'id',
            'class_name',
            'year_admission',
            'specialization_name',
            'class_teacher_name',
            'students'
        ]

    def get_class_teacher_name(self, obj):
        return f"{obj.class_teacher.last_name} {obj.class_teacher.first_name} {obj.class_teacher.patronymic or ''}".strip()


class StudentToClassSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    class_id = serializers.IntegerField()

    def validate(self, data):
        try:
            student = Student.objects.get(pk=data['student_id'])
        except Student.DoesNotExist:
            raise serializers.ValidationError("Ученик с указанным ID не найден")

        try:
            class_obj = Class.objects.get(pk=data['class_id'])
        except Class.DoesNotExist:
            raise serializers.ValidationError("Класс с указанным ID не найден")

        if student.class_name and student.class_name.id != data['class_id']:
            raise serializers.ValidationError("Ученик уже состоит в другом классе")

        data['student'] = student
        data['class_obj'] = class_obj
        return data


class LessonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'date']


class MarkSerializer(serializers.ModelSerializer):
    lesson_id = serializers.IntegerField(source='lesson.id')

    class Meta:
        model = Mark
        fields = ['lesson_id', 'mark']