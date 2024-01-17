from django.db import models

# Create your models here.
class DiarySavetable(models.Model):
    diary_uuid = models.CharField(db_column='Diary_uuid', primary_key=True, max_length=45)  # Field name made lowercase.
    diary_userid = models.CharField(db_column='Diary_userid', max_length=45)  # Field name made lowercase.
    diary_title = models.CharField(db_column='Diary_title', max_length=45)  # Field name made lowercase.
    diary_content = models.TextField(db_column='Diary_content')  # Field name made lowercase.
    diary_emotionid = models.CharField(db_column='Diary_emotionid', max_length=45, blank=True, null=True)  # Field name made lowercase.
    diary_date = models.DateField(db_column='Diary_date', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Diary_savetable'


class Usertable(models.Model):
    user = models.OneToOneField(DiarySavetable, models.DO_NOTHING, primary_key=True)
    name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'usertable'