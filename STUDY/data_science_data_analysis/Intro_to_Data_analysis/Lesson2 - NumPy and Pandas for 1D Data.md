# Lesson 2: NumPy and Pandas for 1D Data

## Pandas & NumPy

- Pandas : Series - More features
- NumPy : Array - Simpler

## Numpy

Numpy Arrays and Python Lists

- Similarities : Access (`a[0] / a[1:3]`) / Loops (`for x in a`)
- Differences : Elements should have same type / Convenient functions / Multi-Dimension



### `np.argmax`

returns <u>index of maximum value</u>



### Add Vector

`[1,2,3] + [4,5,6] = [5,7,9]`



#### <u>What is Vector?</u>

> Array with numerical elements



### Multiply by a scalar

`[1,2,3] * 3 = [3,6,9]`



### Available Math Operations

Add(`+`) / Subtract(`-`) / Multiply(`*`) / Divide(`/`) / Exponentiate(`**`)



### Logical Operations

And(`&`) / Or(`|`) / Not(`~`)



### Comparison Operations

Greater(`>`) / Less(`<`) / Equal(`==`) / Not equal(`!=`)



## Standardize

Use **Standard Deviation** which is square root of **variance**

```python
def standardize_data(values):
    standardized_values = (values-values.mean()) / values.std()
    return standardized_values
```



## +, +=

`+=`는 객체 유지

`+`는 새로운 객체에 값 저장



## Pandas Series

has more functionality like `s.describe()`



### Pandas Indexes

in Pandas, you can point certain data by giving index

```python
life_expectancy = pd.Series([74.7, 75., 83.4, 57.6], index = ['Albania', 'Algeria', 'Andorra', 'Angola'])
```

Now, each data matches with their country name and you can access value with index name and order.

```python
life_expectancy[0] == life_expectancy.loc['Albania'] == life_expectancy.iloc[0]
```



## Remove missing values

1. use .dropna()
2. before addition, treat missing value as 0



## apply() - `Pandas`

`apply()` takes a series and a function and returns a new series

(it works like `map()` in python)



there's a series named `s`

and you can write `s.apply(add3)` to express `s+3`



```python
def reverse_name(name): # function for elements
    split_name = name.split(' ')
    first_name = split_name[0]
    last_name = split_name[1]
    return last_name + ', ' + first_name

def reverse_namse(names):
    return names.apply(reverse_name) # with apply, you can apply function to each elements
```

