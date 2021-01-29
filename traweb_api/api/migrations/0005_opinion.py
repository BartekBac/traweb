# Generated by Django 3.1.3 on 2021-01-28 20:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210116_1813'),
    ]

    operations = [
        migrations.CreateModel(
            name='Opinion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isPositive', models.BooleanField()),
                ('description', models.CharField(blank=True, max_length=2048)),
                ('travel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='opinions', to='api.travel')),
            ],
        ),
    ]
