## WonderTix Deployment Strategy

### Introduction

This document aims to clarify the deployment strategy of the WonderTix project. Specifically, it will discuss the various deployment environments that will be used, as well as the general principles involved in specifying those environments and promoting code from one to the other.

### Key terms

Before getting into specifics, here are some quick definitions to guide the following discussion.

**deployment**
The process of making a given codebase available within a target environment, or the    result of such a process.

**environment**
An isolated computing context with its own distinct configuration.

**promotion**
The systematic process of moving code from one environment to another.

**dev, stg, and prd**
These are common identifiers referring to different types of deployments or environments. They stand for development, staging, and production, and it’s important to have a general sense of them before going further.

Analogies can be helpful here, and considering our client, it seems appropriate to draw from the world of theater. So as I elaborate on dev, stg, and prd below, the first paragraph will give a technical description and the second will give an analogy.

**dev (development) environment**
*Description*: the development environment is where we build and test individual pieces of software in isolation. There will be lots of experimentation and breakages here before promotion to staging.

*Analogy*: Think of dev as a private workshop when producing a play: you might have writers working on the script, actors practicing their lines, and stagehands building sets. Maybe you’ve got a violinist scraping away in the corner, and a trombonist playing scales in the parking lot.

**stg (staging) environment**
*Description*: The staging environment is intended to replicate the production environment as much as possible. This is where we integrate the various components we’ve already built and tested in isolation, and make sure they can withstand some of the stresses of production.

*Analogy*: Think of stg as a dress rehearsal where you can still pause the action if you need to. At this point you’ll be practicing on stage, bringing together costumes, sets, music, etc. You’ll put people in the audience to simulate giving a live performance. That errant trombonist will be in the pit, taking direction from the conductor and playing along with everyone else.

**prd (production) environment**
*Description*: The production environment is where our code is running and live, freely accessible by end users. This is where customers access the website and use the WonderTix application.

*Analogy*: Think of prd as the main performance where the audience is right in front of you and the show must go on. If an actor forgets his lines or the trombonist hits a wrong note, the audience is going to notice. If things get bad enough, people might walk out or want their money back.

### General principles

There are different motivations for using multiple environments, but I think we can cover a lot of ground by talking about three basic principles:

1. Isolation
2. Testing
3. Risk management

I’ll address each of those in turn.

**Isolation**
By isolating each of our deployment environments, we can use them for different purposes. This means we can configure things like the following:

- API endpoints
- authentication mechanisms (eg. tokens)
- database schema and/or data
- logging and monitoring
- firewall rules
- error handling and failover mechanisms

I’m sure you can imagine how those items might vary depending on immediate goals.

For example, our staging environment can get by without automated failure recovery; it would be annoying for it to fail catastrophically and it could delay development, but it wouldn’t directly affect the client or their customers.

On the other hand, if our production environment failed catastrophically and we had no automated failover mechanism, the entire website would be unavailable to end users for an indeterminate period of time (until we noticed and got around to fixing the problem). Needless to say, the client would not be happy and we would not look very good.

I’ll talk more about such things under the rubric of risk management below, but this touches on another advantage of isolation: namely, it helps prevent failures of all kinds from reaching the end user. Such failures can range from simple compiler errors all the way up to complex failures of integration.

So isolation keeps problems from flowing downstream to the consumer, and it also allows us to customize each environment for a particular set of tasks. One common task across environments is testing. We’ll discuss that next.

#### Testing

By dividing up the overall CI/CD pipeline into distinct, isolated environments, you can perform different kinds of tests on each of them. This allows you to confirm functionality on smaller, more isolated components before proceeding to larger, more integrated ones.

For example, we’ll definitely want some unit testing in our dev environment to make sure we’re not breaking anything, but we can probably get away with minimal integration testing (eg. using dummy data in our database or only testing connectivity). We don’t really need to worry about security testing at this point: the main thing here is confirming that each component of our application works in isolation.

In the staging environment, however, we’ll start ensuring that all the various parts work together. We’ll want to have more robust integration testing that ideally involves real customer data, and we’ll probably want to start assessing security vulnerabilities. Staging is meant to replicate the conditions of the production environment as closely as possible, so this is where we would introduce some kind of performance testing (eg. to check how the app handles levels of simulated traffic).

The main point here is that having different environments allows you to produce a multi-layered testing approach. Basically we’re creating a series of bottlenecks, each of which will catch its own particular kind of problem. Generally speaking, the testing pipeline starts from the more specific and isolated, and flows toward the more general and interconnected.

#### Risk management

In a sense, everything we’ve talked about so far falls under the heading of risk management. If we didn’t care about risk, we wouldn’t bother to isolate our environments or do any kind of testing at all. We could just build whatever we had and push it out onto some dark corner of the internet and let it fend for itself. Maybe we’d fix breakages as we noticed them, or maybe not.
Breakages are inevitable, and in the context of deployment, we want to automate our response to them as much as we can. Sort of by definition, deployments are more exposed and vulnerable than, say, local environments belonging to individual developers. We can test up to a certain point and reduce as many vulnerabilities as possible, but in this sort of complex network environment, some level of risk will always remain.

Risk management, then, is about anticipating and hedging against the kinds of things we can’t necessarily test or avoid. For example, if the particular machine running our deployment in a given data center suddenly overheats or corrupts its aging hard drive, we’d better have mechanisms in place to detect this failure and spin up another instance on a different box. Fortunately for us, this is the kind of thing we’re paying GCP to do; the point is, it’s important to think about such scenarios and have plans in place for dealing with them.

### WonderTix deployments

This section is a work in progress and might be moved to a separate document at some point. For now, it will indicate some of our plans for the WonderTix project’s various environments.

##### dev (development)

We are currently investigating how to run our automated tests locally by expanding our existing docker-compose setup. This would allow us to reduce build costs on GCP, among other things. Promotion to stg would take place upon successful merge of a PR. To start, though, we’ll prioritize staging and production before improving our local configuration.

##### stg (staging)

Our stg deployment will look a lot like our current MVP deployment. To begin, we will simply migrate the MVP deployment to our new WonderTix project on GCP. From there, we’ll verify that our automated tests run as expected, determine what changes need to be made to the environment, and clarify how our triggers will promote code from stg to prd. Staging should have robust database testing: that is probably the main difference between staging and whatever development environment we set up.

##### prd (production)

Again, to get started, we’ll reproduce the stg deployment and then identify necessary changes to the environment. These should be minimal and will likely pertain to access and security. We will need to configure DNS so that end users can access the PPH site using a proper domain name. We will likely need some kind of load balancing to interface with a backup deployment (bak), which we can use to minimize downtime in the event of a catastrophic failure in prd. It’s possible, however, that there are different mechanisms within GCP that can do something similar. We’re going to look into that.

### Conclusion

Hopefully this document has given a decent overview of deployment strategies in general, as well as provided a sketch of where we’re going this term with our WonderTix deployments. Feel free to leave comments or suggestions for improvement.
