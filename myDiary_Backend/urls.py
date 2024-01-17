from django.urls import path

from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('items/', views.test_view),
    path('getDiary/',views.getDiary),
    path('postDiary/',views.postDiary),
    path('searchDiary/',views.searchDiary),
]