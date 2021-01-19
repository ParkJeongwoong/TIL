```python
##### 입력 : 정점의 수(N) 간선의 수(M) 탐색의 시작 점점(V)
import sys

N, M, V = map(int,sys.stdin.readline().split())



##### (N x N) array 만들기
Nodes = []
for i in range(N):
    Nodes.append([0]*N) # 이게 N = [Nodes]*N 이렇게 짜면 참조변수가 된다.

visited = [0] * N # 방문한 곳


# Edge 연결
for i in range(M):
    a, b = map(int,sys.stdin.readline().split())
    Nodes[a-1][b-1] = 1
    Nodes[b-1][a-1] = 1

# print(Nodes)



##### DFS
def DFS(Nodes,V,visited,bills):
    # print(V)
    visited[V] = 1
    point = V
    point_clock = 0
    bills.append(V+1)

    while visited[point]: # 다음 Node 찾기
        point = Nodes[V].index(1,point_clock)
        # print('point ',point)
        if visited[point] == 1: # 빠르게 pointing
            point_clock = point + 1
            # print('clock ',point_clock)
            if point_clock == len(visited):
                # print('??',bills)
                return bills

    # print(point)
    # print(visited)
    # print(bills)

    return DFS(Nodes,point,visited,bills)

# DFS 출력
bills = []
DFS_result = DFS(Nodes,V-1,visited,bills)
for i in range(len(DFS_result)):
    print(DFS_result[i], end = ' ')
 
 
######################다른 방법
def DFS(Nodes,V,visited,bills):
    visited[V] = 1
    bills.append(V+1)

    for i, node in enumerate(Nodes[V]):
        print(i, node, visited)
        if node == 1:
            if visited[i] == 0:
                print(bills)
                DFS(Nodes,i,visited,bills)

    return bills


bills = []
visited = [0] * N

DFS_result = DFS(Nodes,V-1,visited,bills)
print(DFS_result)

