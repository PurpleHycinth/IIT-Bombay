from django.urls import path
from .views import CourseListCreate, CourseDetail, CourseInstanceListCreate, CourseInstanceDetail

urlpatterns = [
    path('courses/', CourseListCreate.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetail.as_view(), name='course-detail-delete'),
    path('instances/', CourseInstanceListCreate.as_view(), name='instance-list-create'),
    path('instances/<int:year>/<int:semester>/', CourseInstanceListCreate.as_view(), name='instance-list'),
    path('instances/<int:year>/<int:semester>/<int:pk>/', CourseInstanceDetail.as_view(), name='instance-detail-delete'),
]
