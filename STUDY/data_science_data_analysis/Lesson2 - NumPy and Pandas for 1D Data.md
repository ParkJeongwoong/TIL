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



