## flatten

### List Comprehension

`[y for x in list_of_lists for y in x]`

이렇게 하면 flatten 가능

- for x in list_of lists 가 먼저 해석 => x에 2차원 리스트의 원소인 1차원 리스트들이 들어감
- y for y in x 가 다음에 해석되면서 1차원 리스트들 안에 있는 원소들이 y에 들어감



### itertools

- `itertools.chain()`

```python
def chain(*iterables):
    # chain('ABC', 'DEF') --> ['A', 'B', 'C', 'D', 'E', 'F']
    for it in iterables:
        for element in it:
            yield element
```

`list(itertools.chain(list_of_lists))`



- `itertools.chain.from_iterable()`

```python
def from_iterable(iterables):
    # chain.from_iterable(['ABC', 'DEF']) --> ['A', 'B', 'C', 'D', 'E', 'F']
    for it in iterables:
        for element in it:
            yield element
```

`list(itertools.chain.from_iterable(list_of_lists))`





## 출처

https://blog.winterjung.dev/2017/04/21/list-of-lists-to-flatten
