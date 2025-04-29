---
author: AI-PHI
pubDatetime: 2025-04-29T19:00:00Z
# modDatetime:
title: Our Causerie on Reasoning
slug: causerie-reasoning
draft: true
featured: false
nextFormal: false
tags:
  - causerie
  - reasoning
  - llm
  - ai
  - philosophy
description: The output from our first causerie on the topic of reasoning.
session: false
ogImage: assets/AI-Phi-Causerie-Reasoning.png
---

## What is AI-Phi?

AI-Phi is a research community in Paris that operates at the intersection of AI and philosophy. Its purpose is to set the stage for social and intellectual gatherings that nurture connections, discussion and debate among diverse individuals.

## What is a Causerie?

A traditional seminar typically showcases a single expert’s perspective, often leaving the audience in the background, in a passive role. In contrast, we wanted to create a space where individuals could actively contribute, bringing their unique research contexts and personalities into an open-form, relaxed discussion. To achieve this, we took inspiration from the French concept of a _causerie_—a term originating from the Parisian salons, where intellectuals engaged in informal yet thought-provoking discussion.

<img src="/assets/AI-Phi-Causerie-Reasoning.png" alt="Cyberpunk illustration of french salons." />

## Our Approach

A topic as broad as ‘reasoning’ needs to be cut down to a more manageable size. To facilitate this, we published a set of questions before the causerie. These questions were:

- ⁠What is reasoning in an AI system?

- How can we know that an AI system is reasoning?

- What is missing from existing AI systems that prevent them from reasoning effectively?

This served to both prompt thought and to be used as the basis for creating materials for the causerie to help guide the conversation.

A collection of relevant ideas were presented during the causerie, not to showcase expertise, but to provide a common ground for discussion. The focus was on providing many on-ramps to different concepts that people could engage with, which is important given our diverse audience. It also included multiple conversational "pit stops"—open-ended questions designed to spark discussion along the way.

## Our Causerie on Reasoning

In classical AI, reasoning consists of the formalization of knowledge as facts and rules that can be manipulated through a series of logically verifiable steps. This approach was inspired by mathematical logic, focusing on symbolic representations of knowledge. However, as AI systems encountered the complexity of real-world applications, symbolic rule-based systems revealed their limitations. They were brittle, required extensive knowledge of engineering and couldn’t handle uncertainty and ambiguity. This prompted the rise of more robust methods such as fuzzy logic and Bayesian networks - better handling uncertainty and ambiguity. More recently, deep learning emerged as a new paradigm, able to learn complex patterns from data automatically, instead of relying on hand-crafted rules. This led to powerful, flexible models that can handle different modalities of data.

The transformer architecture enabled the first truly powerful language models. Training them to follow instructions transformed them from text generators into versatile task-solving tools, to the extent that many subproblems in the field of natural language processing could be merged into a model. As large language models (LLMs) advanced in complexity, reasoning-like behavior emerged, not through explicit design, but as a byproduct of scale. Surprisingly, simply prompting models with phrases like “Let’s think step by step” elicited more structured, logical responses from models. What we call reasoning models now is a capitalization of this emergent behavior, further refining and enhancing it. These models perform much better on AI benchmarks but what ‘reasoning’ they really do remains unclear. The language we use to describe deep learning models — terms like reasoning, understanding, or planning—often serves as a metaphor, bridging the intuitive gap between human cognitive processes and statistical pattern recognition. The extent to which these models genuinely reason versus simulate reasoning remains an open and deeply debated question.

As with any good philosophical discussion, our causerie began with an attempt at a definition. ‘Reasoning’ - what the heck is it? The goal was to take a step back from the current hype surrounding large language models (LLMs) to re-evaluate this elusive property of intelligence. We initially approached this question by turning it on its head by asking “what is being unreasonable”? Surely, what we consider to be unreasonable would provide good counter examples to contrast with reason? Some of these examples included: Acting based on emotions, making statements without justification, being incoherent and inconsistent, resisting belief revision, lacking process/methodology and overlying relying on intuitions. One of the lines of inquiry that emerged from this was the idea that intuition and emotion might actually be a fundamental part of human reasoning. In particular, the work of Antonio Damasio showed that when parts of the brain associated with emotion are damaged, decision making is impaired. While it's true that being overly emotional and relying on intuitions alone might lead to unreasonable arguments, they might actually be a feature of reasoning rather than a bug.

Emotions and intuitions are a fundamental backdrop of embodied experience carried in our present and past histories that allows us to incorporate poorly specified, subsymbolic streams of information into our reasoning processes. Moreover, perhaps they are instrumental in governing our exploration of our environment and fundamental in how we construct world models. That is, not only are they fundamental abstract sources of information about embodied states, they also govern which among the infinite possible states we might settle upon. Such a fundamental driving force for experience would likely interact across multiple levels of cognition, having wide-reaching effects. Coming from a computational background, these sorts of considerations opened a big can of worms for me.

Later in our discussion there was also the question of whether reasoning really had to be directed in some goal-oriented way. I personally wasn’t _really_ sure that was necessary for a definition of reasoning. This was quickly taken to task. Even if goals aren’t explicit, our minds are organising themselves towards particular ends. In particular, the default mode network of the brain is active when we are idle, as opposed to our central executive network, which is more task oriented. The default mode network is where meandering thoughts emerge, day dreams about past and future events. While ‘reasoning’ in AI might be something we ask systems to do at a high level of abstraction, our experiential existence is always trying to make sense of the world, consciously or unconsciously. This directedness isn’t just a high-level cognitive task but might be driven by much more fundamental aspects of embodiment than I had previously considered.

Perhaps what constitutes reasoning lies along a continuum, starting from vague intuitions and emotions that continuously survey the landscape of our body, this serves to prune our hypothesis space and moments of meandering background thought where solutions and ideas drift into our mind for consideration. Moving from this to the more self aware modes of reasoning where we make crude judgments and justifications based on instinctive social aspects such as appeals to authority and expertise, forming convenient narratives and explanations that allow us to co-exist in social contexts. The examples of reasoning we usually talk about in AI are at the end of this continuum, involving facts, rules and search using symbolic-like representations. It’s probably all necessary in building fully integrated reasoning AI systems.

_This was just one viewpoint on the intense and varied discussion of our first causerie. It is emblematic of an attempt to grasp at a deeper understanding rather than a definitive statement on reasoning itself. What follows are more perspectives from the AI-Phi community._

_Michael Anslow_ [💼 LinkedIn](https://www.linkedin.com/in/michael-anslow-22268420/)

## Member Contributions

### Clément Bénesse

[💼 LinkedIn](https://www.linkedin.com/in/cl%C3%A9ment-b%C3%A9nesse-a49171174/)

When it comes to reasoning and AI, I feel there are multiple points of interest. Let me start by saying that, while there is much to say when talking about emergent behaviors due to the multiplicity of – AI but not only – agents, I’ll stay in the mono-agent framework. Moreover, the tone and scope of this contribution is clearly grounded and skewed in the mathematical background that I have. That being said, one of the very first idea or assumptions that I’d like to put out there is that reasoning is akin to a trajectory or walk on some kind of logical graph with nodes “valid assertions” and edges the use of theorems or logical steps (or even heuristics when working with fuzzy logic or limited compute as we usually do).

In that regard, the approaches can be different for human-based reasoning and machine-based reasoning, as there is a tension between “the end goal” – which is the final assertion of a theorem or in some cases the intuition one aims to prove – and the “art and manner” – that is, on which nodes one passes during the trajectory from start to finish. While humans may tend to have good heuristics and the ability – grounded in the knowledge of a “grand scheme” – to differentiate between “interesting properties” and logical assertions with little to no value , they also have issues with the rigor and format required to navigate the edges between nodes. On the contrary, models can – in favorable cases – assess the truthfulness of some assertions much quicker but can have difficulties ranking them.

While this dichotomy appears artificial – but then again, when it comes to AI models, what doesn’t? – , I believe two elements complement it. The first one, on the human side, is the concept of beauty in reasoning. This is usually experienced when the total distance needed to go from a starting point to end point appears at first large ; but using some shortcuts, peculiarly clever insights or mental representations, one exhibits that the trajectory is in fact much shorter than expected. This is not very different from yet another principle of least action, albeit in the logical world – and I would not be surprised if this approach has already been explored extensively… And perhaps – and we come to the second addition – this is precisely what appears counterintuitive and almost magical when working with LLMs capable of reasoning. The shortest path is found, the course is set and one obtains the answer they seek at a lesser mental cost. But make no mistake here, the main driver here is not computation (even if it helps) but memorization. Let’s address the Occam’s razor here: modern LLMs are trained on virtually every piece of knowledge found on the Internet, use architectures specialized in memorization of elements and their interactions, and yet have a quadratic algorithmic complexity that makes them computationally unable by themselves to solve classical problems. What is the most probable, that LLMs are able to find complex logic on the fly, or the fact that they memorize the proximity between logical assertions and the related invoked argument?

Do not get me wrong, the evolution and current capacities of models are very impressive but if, to quote A. Clarke, “any sufficiently advanced technology is indistinguishable from magic”, then maybe “any sufficiently advanced memorization is indistinguishable from reasoning”...

---

### Olha Sobetska

[💼 LinkedIn](https://www.linkedin.com/in/olha-sobetska-b5b9041ba)

Reasoning is a property of the brain, which itself is a non-linear system. Thus, defining reasoning from the perspective of chaotic properties does not seem nonsensical. Reasoning may come (emerge) when a particular goal (attractor) is set. Further, some adaptive and self-organized processes may occur, for example, organizing arguments into one chain to achieve this goal (e.g., a solution / decision).

The complexity of reasoning may be driven from the interplay between emotional, social, physiological, etc. components and is therefore not always easily predictable. Through this complexity, new solutions may arise, some of which can be seen as creative. On the opposite end, reasoning with applied logic can be more predictable, since the chain of such reasoning is largely predetermined by the laws of a particular logic.

This makes reasoning, thus, a cognitive tool for achieving goals or decisions whose architecture and predictability can vary depending on the context and the set of parameters (knowledge, emotions, sources, experience, etc.) required to accomplish a goal.

---

### Alexandre (Sacha) Mateescu

[💼 LinkedIn](https://www.linkedin.com/in/alexandru-mateescu-1148b1)

I am familiar with two aspects of reasoning in AI: one philosophical, as I am writing a PhD dissertation on mitigating the risks of recommendation algorithms; the other practical, as I use LLM-based reasoning to assist in this work. I am not involved in the development of AI reasoning in commercial, marketing, or engineering contexts. Paradoxically, the very systems I interrogate as a philosopher for the risks they entail belong to the same broad class as those I turn to as a user—eager, even hungry, for the opportunities they promise. So the only legitimate way to speak about the subject is to start from where I personally stand.

**a. Risks**. The challenge is that the world is discovering the risks empirically, one by one, as they arise—making it impossible, for now, to establish a stable and comprehensive typology. That is precisely why I have proposed one, closely tied to the framework of my dissertation. An abstract outlining this typology has been accepted for presentation at the 5th International Conference on Philosophy of Mind in May (https://ifilosofia.up.pt/activities/5-international-conference-philosophy-mind)

**b. Opportunities**. LLMs excel at concealing their lack of genuine reasoning—at least when the chunks of text they process remain small enough. What fascinates me now is the possibility of tracking the evolution of their reasoning abilities month by month, as new versions are released continuously. But I don’t yet know how to approach this systematically. If anyone else shares this curiosity, I’d be glad to team up.
Thus the keywords related to reasoning in AI are: “very active tra

---

### Constant Bonard

[🦋Bluesky](https://bsky.app/profile/cbonard.bsky.social)

#### Reasoning as Mental Actions

When we reflect on the reasoning capacities of AI models, I find it helpful to consider human reasoning as a set of relatively diverse mental actions. These include, for example: planning how to solve a problem, doing calculations, weighing pros and cons, formulating arguments, anticipating objections, imagining creative solutions, recalling what we’ve learned, or finding the right words. Each of these is an action, and every action consists of three parts:

– a goal to be reached,

– a plan to achieve this goal,

– and an execution of that plan

— whether this execution is mental or motor.

Furthermore, most executions can be divided into sub-actions. Making coffee, for instance, involves taking beans from the cupboard, grinding them, pouring water, heating it up. And each of those sub-actions can itself be broken down further, until we reach basic actions that can no longer be subdivided. Now, this same structure applies to mental actions. Reasoning, then, appears to be composed of a variety of mental actions, each directed toward a goal, carried out through a plan, and executed step by step, through sub-actions that each have their own goals, plans, and executions. From this angle, when we ask whether an AI model can reason, we might just as well ask whether it can perform specific mental actions: can it calculate, weigh pros and cons, imagine, plan? And to answer these questions, we should not only look at the result but investigate the presence of relevant goals, plans, executions, and sub-actions.

Now, when it comes to today’s most popular AI architecture — Transformers — we may wonder whether they can implement this structure. First, do they have the relevant goals? From a functionalist perspective, their primary goal, in a sense, is to predict the next text token, based on statistical patterns learned during training. That may not resemble the kinds of goals we have when we reason. However, we might still wonder whether, during their training phase, they can develop internal structures that function analogously to intermediary goals comparable to those that shape our own mental actions. To me, that’s a crucial question in deciding whether or not to attribute reasoning to a Transformer-based AI. In this respect, reinforcement learning architectures may have a better shot at resembling human reasoning, since they are explicitly built around goals and the execution of those goals. That said, since deep learning models are essentially black boxes (despite ongoing advances in explainability and mechanistic interpretability), it’s not impossible that Transformer-based models or other deep learning models besides reinforcement learning could develop internal structures that resemble human goals closely enough. But to find out, we cannot simply analyze their algorithms; we must examine the behavior these models are capable of, in order to infer their artificial "mental life" — including whether they possess goals, plans, and executive abilities that are sufficiently similar to ours to be called genuine reasoning. For those interested in that kind of mental-behavioral methodology, here is a piece I’ve written on the subject: https://philpapers.org/rec/BONCAA-3

---

### Aïda Elamrani

[🦋Bluesky](https://bsky.app/profile/aidaelamrani.bsky.social);
[🐘 Mastodon](https://mastodon.social/@AidaElamrani);
[🐧 Twitter](https://x.com/AidaElam/);
[💼 LinkedIn](www.linkedin.com/in/aida-elamrani);

While collectively _reasoning about reasoning_ during the causerie session, a linguistic confusion was raised a few times. Reasoning carries a variety of nuances, but two of them consistently stood out in our AI-Phi conversation:

(1) the _actions_ and processes by which reasoning happens (i.e. cerebral or algorithmic activity);

(2) the _meaningful_ goal or result of a reasoning process (i.e. reasoning _about_ the next move at a chess game).

The first one puts the spotlight on _active_ and _subjective aspects_, while the second is more about _content_ and _directedness_. The two are complementary.

**Action-Meaning Distinction.** One particular context where we framed the distinction was the question of determining what constitutes an instance of reasoning?

From the _action-perspective_, reasoning is a cognitive ability which can be characterised in terms of architectural constraints, and distinguished from other cognitive abilities (we don’t want to associate reasoning with plain perception, or with automated processes such as driving a car home). It puts the emphasis on effort: reasoning entails computational costs and physical implementations.

Meanwhile, from the _meaning-perspective_, reasoning is assessed in more qualitative terms. Is it really reasoning when you’re just statistically piling up results? To some degree that’s what our brains do (as would suggest frameworks such as the predictive mind theory): perhaps we’re all stochastic parrots. And soon enough, we turn to whether reasoning is successful or not. If we try to predict the best next move on a game of chess, then isn’t it better that we know we are playing chess and we know the purpose of each pawn, and what it means to win, besides reaching a checkmate configuration? Otherwise, are we really reasoning about chess?

**Comparing Natural and Artificial Reasoning.** As were to be expected from our group surrounding AI & Philosophy, we notably considered throughout the question of how to characterise the kind of reasoning carried out by AI and how it relates to the natural case.

**Action Perspective.** Under the action-perspective, what recent models are doing, with deep chain of thought predictions, seems closer to what humans do when they engage in system 2 thinking. But, we can’t even agree that only system 2 defines reasoning – the reasoning act remains difficult to fully grasp even in the natural case. Nevertheless, in terms of computational investment, intuitively, recent models perform an act superior in reasoning than their predecessors. At any rate, reasoning didn’t strike us as belonging to a single class of algorithms. In that sense, it seems that AI can reason.

**Meaning Perspective.** Under the _meaning-perspective_, something else came up: reason itself. The directedness of reasoning is intimately tied to the concepts of causality and intentionality, bringing us back to the questions raised by Searle’s Chinese Room experiment. Reasoning generally entails a goal, one that can (at least, ideally) be achieved to answer a question, or solve a problem. Sometimes, the objective is out of reach: due to a lack of knowledge, decisions made under uncertainty, or the limitations illustrated by Plato’s allegory of the cave. In this sense, current AI models can sometimes surprise us with meaningful insights, but sometimes… they drastically miss the point.

Both in action and meaning, AI reasoning seems partly close to ours, although not fully. How, then, are we to compare AI reasoning with ours?

**Irrationality.** A start could be to examine borderline human cases. For instance, when someone is delusional (dreaming, hallucinating, suffering from psychosis, etc), can they still reason? It surely doesn’t seem incompatible with _performing the act_ and following certain sets of steps. Besides, it is possible that their fantasy has a robust internal consistency, although in their world, chess is about saving the Queen. What appears irrational to general common sense can be _meaningful_ under a different frame of reference: whether it’s across cultures, species or physical substrate.

For some reason, I guess the next step would be to compare the structures of various action-meaning frame of references.

## Closing Remarks

Our first Causerie on Reasoning brought together diverse minds to examine one of AI's hot topics — reasoning. In the spirit of AI-Phi, our Paris-based initiative at the intersection of AI and philosophy, the causerie aimed not to define reasoning in absolute terms, but to explore it by asking many questions, probing its definitions, functions, and boundaries through a shared intellectual experience. Rather than convening around lectures, we built our conversations on open-ended questions, historical contexts, and informal exchanges that gave space to intuition, emotion, and multiple kinds of expertise. In the end, the causerie did not produce a single answer—nor was that ever the goal. Instead, it revealed the multiplicity of what reasoning might be, a conceptual puzzle whose contours shift depending on whether we look through the eyes of philosophers, engineers, or everyday thinkers. And from this shared reflection, new questions emerged—fuel for future causeries and deeper, collective inquiry.
