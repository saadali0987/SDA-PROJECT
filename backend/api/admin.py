from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "username", "role", "profile_image")
    list_filter = ("role",)
    search_fields = ("email", "username")