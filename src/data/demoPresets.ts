export interface ProblemPreset {
  id: string;
  title: string;
  difficulty: 'Div1 Medium' | 'Div1 Hard' | 'Div2 Hard' | 'International Olympiad';
  category: string;
  problemStatement: string;
  reasoningTrace: string[];
  complexity: string;
  generatedCode: string;
}

export const DEMO_PRESETS: ProblemPreset[] = [
  {
    id: 'segment-tree',
    title: 'Range Minimum Query with Lazy Affine Transformation',
    difficulty: 'Div1 Hard',
    category: 'Advanced Tree Structures & Lazy Updates',
    problemStatement: `Given an array A of N elements (N <= 200,000), support Q operations (Q <= 200,000):
1. Multiply range [L, R] by V and add W modulo 998244353.
2. Query sum and minimum in range [L, R] modulo 998244353.
Time Limit: 1.0s, Memory Limit: 256MB.`,
    reasoningTrace: [
      'Identified range affine transformation problem with composition of linear functions (f(x) = ax + b).',
      'Function composition: (c * (a*x + b) + d) = (c*a)*x + (c*b + d). Compose tags from parent to child in O(1).',
      'Segment tree node maintains: { sum, min_val, lazy_a, lazy_b, len } initialized with identity (lazy_a=1, lazy_b=0).',
      'Lazy pushdown maintains algebraic invariant before recursing into children; pull-up updates interval aggregates.'
    ],
    complexity: 'Time: O((N + Q) log N) | Space: O(4N) | Refusals: 0',
    generatedCode: `#include <bits/stdc++.h>
using namespace std;

static const int MOD = 998244353;

struct Node {
    long long sum, min_val;
    long long lazy_a, lazy_b;
    int len;
};

class AffineSegTree {
    int n;
    vector<Node> tree;

    void apply(int p, long long a, long long b) {
        tree[p].sum = (tree[p].sum * a + b * tree[p].len) % MOD;
        tree[p].min_val = (tree[p].min_val * a + b) % MOD;
        tree[p].lazy_a = (tree[p].lazy_a * a) % MOD;
        tree[p].lazy_b = (tree[p].lazy_b * a + b) % MOD;
    }

    void push(int p) {
        if (tree[p].lazy_a == 1 && tree[p].lazy_b == 0) return;
        apply(p << 1, tree[p].lazy_a, tree[p].lazy_b);
        apply(p << 1 | 1, tree[p].lazy_a, tree[p].lazy_b);
        tree[p].lazy_a = 1;
        tree[p].lazy_b = 0;
    }

    void pull(int p) {
        tree[p].sum = (tree[p << 1].sum + tree[p << 1 | 1].sum) % MOD;
        tree[p].min_val = min(tree[p << 1].min_val, tree[p << 1 | 1].min_val);
    }

public:
    AffineSegTree(int sz) : n(sz), tree(4 * sz) {}

    void build(int p, int l, int r, const vector<long long>& arr) {
        tree[p].lazy_a = 1; tree[p].lazy_b = 0;
        tree[p].len = r - l + 1;
        if (l == r) {
            tree[p].sum = tree[p].min_val = arr[l] % MOD;
            return;
        }
        int mid = (l + r) >> 1;
        build(p << 1, l, mid, arr);
        build(p << 1 | 1, mid + 1, r, arr);
        pull(p);
    }

    void update(int p, int l, int r, int ql, int qr, long long a, long long b) {
        if (ql <= l && r <= qr) {
            apply(p, a, b);
            return;
        }
        push(p);
        int mid = (l + r) >> 1;
        if (ql <= mid) update(p << 1, l, mid, ql, qr, a, b);
        if (qr > mid) update(p << 1 | 1, mid + 1, r, ql, qr, a, b);
        pull(p);
    }

    long long query_sum(int p, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[p].sum;
        push(p);
        int mid = (l + r) >> 1;
        long long res = 0;
        if (ql <= mid) res = (res + query_sum(p << 1, l, mid, ql, qr)) % MOD;
        if (qr > mid) res = (res + query_sum(p << 1 | 1, mid + 1, r, ql, qr)) % MOD;
        return res;
    }
};`
  },
  {
    id: 'hopcroft-karp',
    title: 'Maximum Cardinality Bipartite Matching',
    difficulty: 'Div1 Medium',
    category: 'Graph Theory & Augmenting BFS/DFS Flow',
    problemStatement: `Given a bipartite graph with vertex partitions U and V (each up to 50,000 vertices) and E edges (up to 150,000), compute maximum matching with minimal latency.
Constraint: O(E * sqrt(V)) worst-case bound without allocation stalls.`,
    reasoningTrace: [
      'Unconstrained graph engine selects Hopcroft-Karp algorithm with alternating layered BFS level graph construction.',
      'DFS traverses strictly along shortest augmenting paths in the current level graph.',
      '0-indexed adjacency list representation with contiguous memory cache lines to maximize throughput on single GPU execution.'
    ],
    complexity: 'Time: O(E * sqrt(V)) | Space: O(V + E) | Deterministic Convergence: 100%',
    generatedCode: `#include <bits/stdc++.h>
using namespace std;

class HopcroftKarp {
    int u_sz, v_sz;
    vector<vector<int>> adj;
    vector<int> pair_u, pair_v, dist;

public:
    HopcroftKarp(int n, int m) : u_sz(n), v_sz(m), adj(n + 1), pair_u(n + 1, 0), pair_v(m + 1, 0), dist(n + 1) {}

    void add_edge(int u, int v) {
        adj[u].push_back(v);
    }

    bool bfs() {
        queue<int> q;
        for (int u = 1; u <= u_sz; ++u) {
            if (pair_u[u] == 0) {
                dist[u] = 0;
                q.push(u);
            } else {
                dist[u] = 1e9;
            }
        }
        dist[0] = 1e9;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            if (dist[u] < dist[0]) {
                for (int v : adj[u]) {
                    if (dist[pair_v[v]] == 1e9) {
                        dist[pair_v[v]] = dist[u] + 1;
                        q.push(pair_v[v]);
                    }
                }
            }
        }
        return dist[0] != 1e9;
    }

    bool dfs(int u) {
        if (u == 0) return true;
        for (int v : adj[u]) {
            if (dist[pair_v[v]] == dist[u] + 1 && dfs(pair_v[v])) {
                pair_v[v] = u;
                pair_u[u] = v;
                return true;
            }
        }
        dist[u] = 1e9;
        return false;
    }

    int max_matching() {
        int matching = 0;
        while (bfs()) {
            for (int u = 1; u <= u_sz; ++u) {
                if (pair_u[u] == 0 && dfs(u)) matching++;
            }
        }
        return matching;
    }
};`
  },
  {
    id: 'bitmask-dp',
    title: 'Shortest Hamiltonian Path with State Pruning',
    difficulty: 'Div2 Hard',
    category: 'Dynamic Programming with Submask Iteration',
    problemStatement: `Find shortest Hamiltonian path visiting all N vertices (N <= 22) in a directed weighted graph with arbitrary weights and obstacle exclusions.
Optimize memory to fit strictly within L1/L2 cache lines.`,
    reasoningTrace: [
      'Problem modeled as DP on subsets: dp[mask][u] = minimum cost to visit set of vertices defined by mask, ending at vertex u.',
      'Total state space: 2^N * N states. For N=22, 2^22 * 22 = 92,274,688 32-bit integers (~369 MB).',
      'Atlas applies bitwise integer optimizations (popcount and bit indexing) for lightning cache spatial locality.'
    ],
    complexity: 'Time: O(2^N * N^2) | Space: O(2^N * N) | Latency: 0.8ms',
    generatedCode: `#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

int solve_hamiltonian(int n, const vector<vector<int>>& dist_matrix) {
    int total_states = 1 << n;
    vector<vector<int>> dp(total_states, vector<int>(n, INF));

    for (int i = 0; i < n; ++i) {
        dp[1 << i][i] = 0;
    }

    for (int mask = 1; mask < total_states; ++mask) {
        for (int u = 0; u < n; ++u) {
            if (!(mask & (1 << u)) || dp[mask][u] == INF) continue;

            for (int v = 0; v < n; ++v) {
                if (mask & (1 << v)) continue;
                int next_mask = mask | (1 << v);
                dp[next_mask][v] = min(dp[next_mask][v], dp[mask][u] + dist_matrix[u][v]);
            }
        }
    }

    int ans = INF;
    int all_visited = total_states - 1;
    for (int u = 0; u < n; ++u) {
        ans = min(ans, dp[all_visited][u]);
    }
    return ans;
}`
  },
  {
    id: 'tarjan-scc',
    title: 'Tarjan Strongly Connected Components & 2-SAT Solver',
    difficulty: 'Div1 Medium',
    category: 'Graph Decomposition & Boolean Satisfiability',
    problemStatement: `Given a 2-SAT formula with N boolean variables and M clauses (N, M <= 100,000), construct an assignment satisfying all constraints or prove unsatisfiability in linear time.`,
    reasoningTrace: [
      '2-SAT clause (A or B) mapped to directed implication graph: (!A => B) and (!B => A).',
      'Tarjan single-pass DFS algorithm computes strongly connected components with low-link numbers.',
      'Unsatisfiable if and only if variable x and its negation !x belong to identical strongly connected component.'
    ],
    complexity: 'Time: O(N + M) | Space: O(N + M) | 100% Deterministic Guarantee',
    generatedCode: `#include <bits/stdc++.h>
using namespace std;

class TwoSatSolver {
    int num_vars;
    vector<vector<int>> adj;
    vector<int> dfn, low, scc_id;
    vector<bool> in_stack;
    stack<int> st;
    int timer = 0, scc_count = 0;

    void tarjan(int u) {
        dfn[u] = low[u] = ++timer;
        st.push(u);
        in_stack[u] = true;

        for (int v : adj[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (in_stack[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }

        if (low[u] == dfn[u]) {
            scc_count++;
            while (true) {
                int node = st.top(); st.pop();
                in_stack[node] = false;
                scc_id[node] = scc_count;
                if (node == u) break;
            }
        }
    }

public:
    TwoSatSolver(int n) : num_vars(n), adj(2 * n + 2), dfn(2 * n + 2, 0), low(2 * n + 2, 0), scc_id(2 * n + 2, 0), in_stack(2 * n + 2, false) {}

    // Variable index 1-based. Positive x is true, negative x is false.
    void add_clause(int u, int v) {
        int not_u = (u > 0) ? (u + num_vars) : (-u);
        int pos_u = (u > 0) ? u : (-u + num_vars);
        int not_v = (v > 0) ? (v + num_vars) : (-v);
        int pos_v = (v > 0) ? v : (-v + num_vars);

        // !u => v, !v => u
        adj[not_u].push_back(pos_v);
        adj[not_v].push_back(pos_u);
    }

    bool solve(vector<bool>& assignment) {
        int total_nodes = 2 * num_vars;
        for (int i = 1; i <= total_nodes; ++i) {
            if (!dfn[i]) tarjan(i);
        }

        assignment.resize(num_vars + 1);
        for (int i = 1; i <= num_vars; ++i) {
            if (scc_id[i] == scc_id[i + num_vars]) return false; // Unsatisfiable
            // Variable is TRUE if its positive node has lower topological order (larger SCC ID in Tarjan)
            assignment[i] = (scc_id[i] < scc_id[i + num_vars]);
        }
        return true;
    }
};`
  }
];
