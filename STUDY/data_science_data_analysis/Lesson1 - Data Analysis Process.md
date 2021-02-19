# Lesson 1: Data Analysis Process

## Data Analysis Process

`Question` - `Wrangle` - `Explore` - `Draw Conclusions` - `Communicate`

- Question : Decide what to analyze
- Wrangle : Data <u>acquisition</u> / Data <u>cleaning</u>
- Explore : Build <u>intuition</u> / Find <u>patterns</u>
- Draw Conclusion : make <u>predictions</u> or <u>conclusion</u>
- Communicate : Let people know what you found



> CSV File : Comma Separated Values

-> We're going to use CSV file for Data acquisition step



## READ CSV File

### Quiz - CSV

- run by VS Code

```python
import unicodecsv

def read_csv(filename):
    with open(filename, 'rb') as f:
    	reader = unicodecsv.DictReader(f)
    	return list(reader)

enrollments = read_csv('enrollments.csv')
daily_engagement = read_csv('daily_engagement.csv')
project_submissions = read_csv('project_submissions.csv')

print(enrollments)
print(daily_engagement)
print (project_submissions)
```

- run by web VM

```python
import unicodecsv

def read_csv(filename):
    with open(filename, 'rb') as f:
        reader = unicodecsv.DictReader(f)
        return list(reader)
        
enrollments_filename = '/datasets/ud170/udacity-students/enrollments.csv'
engagement_filename = '/datasets/ud170/udacity-students/daily_engagement.csv'
submissions_filename = '/datasets/ud170/udacity-students/project_submissions.csv'

enrollments = read_csv(enrollments_filename)
daily_engagement = read_csv(engagement_filename)     # Replace this with your code
project_submissions = read_csv(submissions_filename)  # Replace this with your code


print enrollments[0]
print daily_engagement[0]
print project_submissions[0]
```



### Quiz - Investigating the Data

```python
import unicodecsv

def read_csv(filename):
    with open(filename, 'rb') as f:
        reader = unicodecsv.DictReader(f)
        return list(reader)

enrollments = read_csv('/datasets/ud170/udacity-students/enrollments.csv')
daily_engagement = read_csv('/datasets/ud170/udacity-students/daily_engagement.csv')
project_submissions = read_csv('/datasets/ud170/udacity-students/project_submissions.csv')
    
### For each of these three tables, find the number of rows in the table and
### the number of unique students in the table. To find the number of unique
### students, you might want to create a set of the account keys in each table.

enrollment_num_rows = len(enrollments)
enrollment_unique_students = set()
for i in range(len(enrollments)):
    enrollment_unique_students.add(enrollments[i]['account_key'])
enrollment_num_unique_students = len(enrollment_unique_students)

engagement_num_rows = len(daily_engagement)
engagement_unique_students = set()
for i in daily_engagement:
    engagement_unique_students.add(i['acct'])
engagement_num_unique_students = len(engagement_unique_students)

submission_num_rows = len(project_submissions)
submission_unique_students = set()
for i in project_submissions:
    submission_unique_students.add(i['account_key'])
submission_num_unique_students = len(submission_unique_students)
```

- Read Data from CSV files

- find `len` of each data set
- find unique key for each data from data set
- find `len` of each unique data

#### Result

```
enrollment_num_unique_students : 1302
engagement_num_unique_students : 1237
submission_num_unique_students : 743
```



## Problems in Data

after investigating, there are **two** problems.

1. **unique student in enrollment** > **engagement table**
   - need to fix this later
2. there are two different unique keys (**'account_key'** and **'acct'**)
   - inconvenient
   - change column from 'acct' to 'account_key'
     - copy values from 'acct' to 'account_key'



### Investigating First Problem

> Missing Engagement Records

When you don't understand the result of your data, that means you're missing something important in your analysis.



1. Identify which point of your data is surprising
2. **print** surprising data point

> this is the way I have used to find reason of problems.



#### Conclusion

In case of the same `join date` and `cancel date`, `days to cancel` is 0.

Maybe, it needs to be enrolled for a full day to record engagement.

- maybe we need some more investigation

after a check, there was 3 missing students who have different join date and cancel date. And they turned out to be test samples. So there's no more surprising point.



## Explore phase

Our question :

**How do numbers in the daily engagement table differ for students who pass the first project?**

Problem of the question :

1. **this will include data from after project submission**

2. **this compares data from different lengths of time**
3. **daily engagement table includes engagement in courses which is not related to the first projec**t

Revision(Refining) :

**Only look at engagement form first week, and exclude students who canceled within a week**



## Quiz - Debugging

we found out that studying time of the first week is greater than the number of  minutes in a week. (Which is impossible)



=> if one student enroll, and cancel, then enroll again, everything from the first enrollment will count as their first week.



