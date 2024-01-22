import os
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests


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
def searchDiary(request):
    print(request.data.keys())
    print(request.data.values())
    if 'diary_title' in request.data.keys() :
        query = DiarySavetable.objects.filter(diary_title=request.data['diary_title'])
        serializer =  diarySerializer(query,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def postKaKaocode(request):
    data = {
        "grant_type":'authorization_code',
        "client_id": os.getenv('REST_API_KEY'),
        "redirect_uri": "http://localhost:3000",
        "code": request.data["code"]
    }
    kakao_token_api = "https://kauth.kakao.com/oauth/token"
    access_token = requests.post(kakao_token_api, data=data).json()["access_token"]

    kakao_user_api = "https://kapi.kakao.com/v2/user/me"
    header = {"Authorization": f"Bearer {access_token}"}
    user_info = requests.get(kakao_user_api, headers=header).json()
    response_data = {
        "user_info": user_info
    }
    print(user_info)
    return Response(user_info, status=status.HTTP_200_OK)

@api_view(['POST'])
def postDiary(request):
    diary = diarySerializer(data=request.data)
    print(request.data)
    if diary.is_valid():
        diary.save()
        return Response(diary.data)
    return Response(diary.errors,status=status.HTTP_400_BAD_REQUEST)


def test_view(request):
    items = DiarySavetable.objects.all() # 테이블의 모든 객체를 불러와 items 변수에 저장
    return render(request, 'index.html', {'items': items})