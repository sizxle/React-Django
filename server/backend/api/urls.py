from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.get_books, name="get_books"),
    path('books/create/', views.create_book, name="create_book")
]