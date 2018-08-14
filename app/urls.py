from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from .import views

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$',views.home),
    url(r'^d1/$', views.doc1),
    url(r'^d2/$', views.doc2),
    url(r'^doc1.html$', views.html1),
    url(r'^doc2.html$', views.html2),
    url(r'^doc3.html$', views.html3),
    url(r'^dmp/$', views.diffMatchPatch),

]
