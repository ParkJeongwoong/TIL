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

