---
title: "Competitive Programming dilemma"
pubDatetime: 2021-07-08T00:00:00+05:30
description: "Competitive programming can be tricky when it’s your starting stage and I still feel it. There are some methodologies I used to solve problems during a contest."
tags: ["Competitive Programming", "CP", "Engineering"]
---
Competitive programming can be tricky when it’s your starting stage and I still feel it. There are some methodologies I used to solve problems during a contest.

<!-- ![blog image](../assets/images/cp.jpeg) -->

In this blog, I describe a story and share with you the dilemma I faced while solving problems in contests and practice.

So on 25th May 2021, I saw a question [link](https://codeforces.com/contest/588/problem/B) in codeforces and I started thinking about how to solve this problem first, it seemed too easy but after I understood the crux of the problem I thought there must be something in the problem that can make it solvable other than brute force which makes the solution **TLE**.

After some time I got an idea using graphs so the idea is we construct a graph/tree having the condition if the number is divisible by 2 we create a node and similarly with 3,5 and then compute **BFS** and find the minimum of the sum of heights of the same result in both the graphs.

This seemed to be easy to be a perfect solution for me then so, I tried to write the code and at last, I succeeded in writing this. Believe me, I didn’t any experience of writing a graph code before so, I started writing the entire code myself to get the crux of writing a recursive code. I always felt it difficult to even think of a recursive code but I laid down with my book and a pen and then wrote the code according to the diagrams I drew on my book. So, at last, it worked and I completed writing it and felt good about myself about this and submitted the code and to my shock, I got a **memory limit error** so, I started thinking where can I reduce the memory usage and etc.. But, I thought as it is from a contest and my solution won’t be that good to write in a short time so there must be some solution which can do it in a lesser amount of time and lesser amount of code.

After thinking for some time, I saw the editorial and as I expected there was a clean and simple logic that I have missed i.e, if we calculate the number that is left after repeatedly dividing the number using (2,3,5) then we can easily tell the result and the complexity will be drastically less compared to my solution.

So, what I understood from this is we don’t need to think a lot for some positions but we need to explore **why the question can be solved** and what makes it solvable in less time (think like its a problem in a contest and **there will be something in the problem that guides us to solve it more easily)**.

The most important thing which I want to summarise is:

- There will be **something unique in the problem** to make it solvable in a lesser complex way.
- Before even coding based on your thoughts, try estimating the complexity and **check with constraints**. Because that can save and guide you for some problems.
- Always **try writing down your thoughts on a paper** or book and sometimes you can find some patterns.
- **Come out of your comfort zone** while practicing 🙂
- Learn Data Structures and that makes you solve problems easily.
- And at last, **it’s all about practice and reading editorials**.

My code using BFS:

```cpp
#include<bits/stdc++.h>
#include<string>
#include<cmath>
using namespace std;

#define int long long
#define ft first
#define sec second
#define fastio(); ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0);

class node{
public:
    int val;
    node *next2;
    node *next3;
    node *next5;

    node (int n){
        val = n;
        next2 = NULL;
        next3 = NULL;
        next5 = NULL;
    }
};

void bfs(map<int,int> &mp,node* curr,int h){
    if(curr == NULL)
        return;

    if(curr->next2 != NULL){
        int val2 = curr->next2->val;
        // cout<<val2<<" "<<h<<endl;
        if(mp[val2] != 0)
            mp[val2] = min(mp[val2],h);
        else
            mp[val2] = h;
    }
    if(curr->next3 != NULL){
        int val3 = curr->next3->val;
        // cout<<val3<<" "<<h<<endl;
        if(mp[val3] != 0)
            mp[val3] = min(mp[val3],h);
        else
            mp[val3] = h;
    }
    if(curr->next5 != NULL){
        int val5 = curr->next5->val;
        // cout<<val5<<" "<<h<<endl;
        if(mp[val5] != 0)
            mp[val5] = min(mp[val5],h);
        else
            mp[val5] = h;
    }h++;

    bfs(mp,curr->next2,h);
    bfs(mp,curr->next3,h);
    bfs(mp,curr->next5,h);
}

void solve(node *curr){
    int n = curr->val;
    if(n == 1)
        return;
    if(n%2 == 0){
        node *temp = new node(n/2);
        curr->next2 = temp;
        solve(curr->next2);
    }
    if(n%3 == 0){
        node *temp = new node(n/3);
        curr->next3 = temp;
        solve(curr->next3);
    }
    if(n%5 == 0){
        node *temp = new node(n/5);
        curr->next5 = temp;
        solve(curr->next5);
    }
}

signed main(){
    fastio();
    int testc=1;//cin>>testc;
    while(testc--){
        int a,b;cin>>a>>b;

        if(a == b)
            cout<<0<<endl; 
        else{
            node *an = new node(a);
            node *bn = new node(b);
            
            solve(an);
            solve(bn);

            map<int,int> mpa,mpb;
            mpa[a] = 1;
            mpb[b] = 1;
            bfs(mpa,an,2);
            bfs(mpb,bn,2);

            int ans = INT_MAX;
            for(auto i:mpa){
                int temp = mpb[i.ft];
                if(temp != 0)
                    ans = min(ans,temp+i.sec);
            }

            if(ans == INT_MAX)
                cout<<-1<<endl;
            else
                cout<<ans-2<<endl;
        }
    }
    cerr << "Time : " << 1000 * ((double)clock()) / (double)CLOCKS_PER_SEC << "ms\n";
    return 0;
}
```

Solution Based on other logic:
```cpp
#include<bits/stdc++.h>
#include<string>
#include<cmath>
using namespace std;

#define int long long
#define vi vector<int>
#define ft first
#define sec second
#define fastio(); ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0);


vi solve(int n){
    vi arr(4,0);//x,2,3,5
    while(n){
        if(n%2 == 0){
            arr[1]++;
            n /= 2;
        }if(n%3 == 0){
            arr[2]++;
            n /= 3;
        }if(n%5 == 0){
            arr[3]++;
            n /= 5;
        }

        if(n%2 != 0 && n%3 != 0 && n%5 != 0)
            break;
    }

    arr[0] = n;
    return arr;
}

signed main(){
    fastio();
    int testc=1;//cin>>testc;
    while(testc--){
        int a,b;cin>>a>>b;

        vi an = solve(a),bn = solve(b);

        if(an[0] != bn[0])
            cout<<-1<<endl;
        else{
            cout<<abs(an[1]-bn[1])+abs(an[2]-bn[2])+abs(an[3]-bn[3])<<endl;
        }
    }
    cerr << "Time : " << 1000 * ((double)clock()) / (double)CLOCKS_PER_SEC << "ms\n";
    return 0;
}
```