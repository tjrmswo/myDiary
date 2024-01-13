from rest_framework import serializers
from .models import DiarySavetable

# serializer.py
class diarySerializer(serializers.ModelSerializer):
    class Meta:
        model=DiarySavetable
        fields='__all__'
        # ("id","name","tel")