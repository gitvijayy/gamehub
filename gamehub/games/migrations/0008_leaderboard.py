# Generated by Django 2.2.3 on 2019-07-03 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_usersonline'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leaderboard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game', models.CharField(blank=True, max_length=500)),
                ('username', models.CharField(blank=True, max_length=500)),
                ('status', models.CharField(blank=True, max_length=500)),
            ],
        ),
    ]
