# Lesson 3: NumPy and Pandas for 2D Data

In this Lesson, we're going to analyze Subway and Weather data.



## Two - Dimensional Data

Python : Lists of lists

NumPy : 2D array

Pandas : Data Frame



So, to access `3rd column` of `1st row` of list `a`, you needed to type a\[1]\[3] in python,

but you can type a[1,3] to access the data.



These are benefits you can get from using 2D array,

- More memory efficient
- `mean(), std(), etc` operate on entire array

---

## Quiz - 3

- `array.argmax()` : find index of maximum value

- `array.mean()` : this works 2D array, too



## NumPy Axis

- `2D_Array.mean(axis = ?)`
  - axis = 0 : mean value of rows of each column
  - axis = 1 : mean value of columns of each row



## NumPy and Pandas Data Types

- `numpy_array.dtpye` : check data types of elements in the array



**In Array of NumPy, each elements in the array should be the same type.**

**But in Dataframe of Pandas, each column is assumed to be a different type.**



```python
import pandas as pd

enrollments_df  pd.DataFrame({
    'account_key': [448, 448, 448, 448, 448],
    'days_to_cancel' : [65, 5, 0, 0, np.nan],
    'is_udacity' : [True, True, True, True, True],
    'join_date' : ['2014-11-10', '2014-11-05', '2015-01-27', '2014-11-10', '2015-03-10'],
    'status' : ['canceled', 'canceled', 'canceled', 'canceled', 'current']
})
```

|      | account_key | days_to_cancel | is_udacity | join_date  | status   |
| ---- | ----------- | -------------- | ---------- | ---------- | -------- |
| 0    | 448         | 65             | True       | 2014-11-10 | canceled |
| 1    | 448         | 5              | True       | 2014-11-05 | canceled |
| 2    | 448         | 0              | True       | 2015-01-27 | canceled |
| 3    | 448         | 0              | True       | 2014-11-10 | canceled |
| 4    | 448         | NaN            | True       | 2015-03-10 | current  |

```
account_key			448
days_to_cancel		17.5
is_udacity			1.0
dtype: float64
```



## Accessing Elements of a DataFrame

- `df.loc['position']` : access to corresponding row
  - `df.loc['position','unit']` : access to an element
- `df.iloc[index]` : access to corresponding row
  - `df.iloc[index, index]` : access to an element
- `df['unit']` : access to certain column
- `df.values` : return only values of data frame not the column names of the row indexes
  - `df.values.mean()` : returns mean value of the whole data values



### Form of DataFrame

```python
ridership_df = pd.DataFrame(
    data=[[   0,    0,    2,    5,    0],
          [1478, 3877, 3674, 2328, 2539],
          [1613, 4088, 3991, 6461, 2691],
          [1560, 3392, 3826, 4787, 2613],
          [1608, 4802, 3932, 4477, 2705],
          [1576, 3933, 3909, 4979, 2685],
          [  95,  229,  255,  496,  201],
          [   2,    0,    1,   27,    0],
          [1438, 3785, 3589, 4174, 2215],
          [1342, 4043, 4009, 4665, 3033]],
    index=['05-01-11', '05-02-11', '05-03-11', '05-04-11', '05-05-11',
           '05-06-11', '05-07-11', '05-08-11', '05-09-11', '05-10-11'],
    columns=['R003', 'R004', 'R005', 'R006', 'R007']
)
```

```
          R003  R004  R005  R006  R007
05-01-11     0     0     2     5     0
05-02-11  1478  3877  3674  2328  2539
05-03-11  1613  4088  3991  6461  2691
05-04-11  1560  3392  3826  4787  2613
05-05-11  1608  4802  3932  4477  2705
05-06-11  1576  3933  3909  4979  2685
05-07-11    95   229   255   496   201
05-08-11     2     0     1    27     0
05-09-11  1438  3785  3589  4174  2215
05-10-11  1342  4043  4009  4665  3033
```



## Quiz - 6

```python
def mean_riders_for_max_station(ridership):
    max_sta = ridership.iloc[0].argmax()
    
    overall_mean = ridership.values.mean()
    mean_for_max = ridership[max_sta].mean()
    
    return (overall_mean, mean_for_max)
```



## Loading Data into a DataFrame

Data frame is Two Dimensional data structure with a different type for each column.



- pandas function `pandas.read_csv('filename.csv')`

- `dataframe.head()` : print first five lines
- `dataframe.describe()` : see **statistics** about each column
