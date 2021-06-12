export const algo = [
	{
		"id": 1,
		"algoName": "Visualize Algorithm",
		"name": "Pathfinding",
		"desc": "PATHFINDING ALGORITHM \n Pathfinding algorithms are usually an attempt to solve the shortest path problem in graph theory. They try to find the best path given a starting point and ending point based on some predefined criteria.Path finding algorithms are important because they are used in applications like google maps, satellite navigation systems, routing packets over the internet."

	},
	{
		"id": 2,
		"algoName": "Visualize Dijkstra",
		"name":"Dijkstra",
		"desc": "DIJKSTRA \nThe abstracted rules are as follows:\n1. Every time that we set out to visit a new node, we will choose the node with the smallest known distance/cost to visit first.\n2. Once we’ve moved to the node we’re going to visit, we will check each of its neighboring nodes.\n3. For each neighboring node, we’ll calculate the distance/cost for the neighboring nodes by summing the cost of the edges that lead to the node we’re checking from the starting vertex.\n4. Finally, if the distance/cost to a node is less than a known distance, we’ll update the shortest distance that we have on file for that vertex.\nTime Complexity: O(E Log V)where, E is the number of edges and V is the number of vertices.\nSpace Complexity: O(V)"
	},
	{
		"id": 3,
		"algoName": "Visualize AStar",
		"name": "A*",
		"desc" : "A* \nThe abstracted rules are as follows:\n1. Every time that we set out to visit a new node, we will choose the node with the smallest value of known distance + it’s heuristic value.\n2. Once we’ve moved to the node we’re going to visit, we will traverse further down in depth to its neighbouring nodes.\n3. For each neighboring node, we’ll calculate the distance for the neighboring nodes by summing the cost of the edges that lead to the node we’re checking from the starting vertex, and add that distance to the heuristic value of the node itself.\n4. The next crucial step in traversal is the performance of backtracking. During each move, we will also check the costs + heuristic values of all of the previously unvisited nodes. If any of these nodes render a more efficient cost, we traverse through them instead.\n5. After traversing through all possible efficient paths, we will find the most profitable one with the least heuristic parameters and the most efficient cost.\nTime Complexity: O(|E|), where E is the number of edges in the graph.\nSpace Complexity: O(|V|), where V is the number of vertices in the graph."
	},
	{
		"id": 4,
		"algoName": "Visualize BFS",
		"name": "BFS",
		"desc" : "BREADTH FIRST SEARCH \nThe abstracted rules are as follows:\n1. In Breadth-first search we take the source node as the first node and push it into a queue, and mark it a visited\n2. Then pop off the front element from the queue, print it, and then we explore its neighbors and push all of it into the queue and mark all of those as visited.\n3. Repeat step 2 until all nodes are visited and keep printing visited nodes until the queue is empty.\n4. Return to the main function once all nodes in the graph are visited.\nTime Complexity: O(|V+E|) where V is the number of vertices in the graph and E is the number of edges in the graph.\nSpace Complexity: O(|V|)."
	},
	{
		"id": 5,
		"algoName": "Visualize DFS",
		"name": "DFS",
		"desc": "DEPTH FIRST SEARCH \nThe abstracted rules are as follows:\n1.In Depth-fist search we pick a starting node and push all its adjacent nodes into a stack.\n2.Then pop a node from stack to select the next node to visit and push all its adjacent nodes into a stack.\n3.Repeat this process until the stack is empty. However, ensure that the nodes that are visited are marked. This will prevent you from visiting the same node more than once. If you do not mark the nodes that are visited and you visit the same node more than once, you may end up in an infinite loop.\nTime complexity: O(V+E)where V is the number of vertices in the graph and E is the number of edges in the graph, when implemented using an adjacency list.\nSpace Complexity: O(|V|)."
	},
];


