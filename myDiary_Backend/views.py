from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializer import diarySerializer
from .models import DiarySavetable

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index")


@api_view(['GET'])
def getDiary(request):
    querysot = DiarySavetable.objects.all()
    serializer = diarySerializer(querysot,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postDiary(request):
    diary = diarySerializer(data=request.data)
    if diary.is_valid():
        diary.save()
        return Response(diary.data)
    return Response(diary.errors,status=status.HTTP_400_BAD_REQUEST)


def test_view(request):
    items = DiarySavetable.objects.all() # 테이블의 모든 객체를 불러와 items 변수에 저장
    return render(request, 'index.html', {'items': items})