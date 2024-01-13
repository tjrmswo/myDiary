from django.db import models

# Create your models here.
class DiarySavetable(models.Model):
    diary_uuid = models.IntegerField(db_column='Diary_uuid', primary_key=True)  # Field name made lowercase.
    username = models.CharField(max_length=45)
    diary_title = models.CharField(db_column='Diary_title', max_length=45)  # Field name made lowercase.
    diary_content = models.TextField(db_column='Diary_content')  # Field name made lowercase.
    diary_address = models.CharField(db_column='Diary_Address', max_length=45, blank=True, null=True)  # Field name made lowercase.
    diary_date = models.DateField(db_column='Diary_date', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'diary_savetable'
