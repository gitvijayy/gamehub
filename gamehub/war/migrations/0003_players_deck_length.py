# Generated by Django 2.2.2 on 2019-06-26 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('war', '0002_auto_20190626_0307'),
    ]

    operations = [
        migrations.AddField(
            model_name='players',
            name='deck_length',
            field=models.IntegerField(default=0),
        ),
    ]
