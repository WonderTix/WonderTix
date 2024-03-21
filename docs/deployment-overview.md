## How your code gets deployed

### Purpose

Some of our developers have expressed interest in getting a better idea of how the WonderTix deployment works. This document is intended to give a high-level overview of that process.

Having this kind of big-picture understanding can lead to better communication among the various teams, especially in the event that something in our CI/CD pipeline goes off the rails – outside of the notification mechanisms we’ll be setting up next term, developers will most likely be the first to notice any breakages in our deployment.

In other words, we’ll all be better off if our devs have a general sense of how this all works.

### In a nutshell

Here’s the short version, for anybody who already has some background on containers, manifests, and deployment in the cloud.

The WonderTix app has a client and server which are containerized separately using Docker. Both client and server have a trigger associated with them on Google Cloud Platform (GCP). These triggers are activated whenever certain changes occur within the WonderTix repo on GitHub; upon activation, those GCP triggers will read instructions in the cloudbuild.yaml for either the client or server, depending on the trigger. Those instructions in the YAML will then build, push, and deploy our container images using Google Cloud Build and Google Cloud Run.

That’s pretty much it. If you’re hazy on certain parts of that, feel free to skip to the relevant section below. If all of this is new to you, keep reading sequentially for a breakdown of each moving part.

### Containerization

A container is a standalone piece of software that can run in more or less any environment. More specifically, a container bundles together all of the dependencies, libraries, and other tools that a particular piece of software needs to run. Containers can be easily moved from machine to machine, and they can be run on any major operating system.

Containers are defined, in our case, by Dockerfiles. A Dockerfile is a set of instructions for building a given container image. That image is then used to spawn running containers.

The relationship between an image and a container is pretty much the same as a program versus a process; in the same way that an OS process is a running instance of a given bit of source code, a container is a running instance of an image.

So in our WonderTix repo, the Dockerfiles you see in the client and server directories are sets of instructions for building containers out of our client and server, respectively.

### Docker and Dockerfiles

Docker is a container runtime (or engine). Essentially it’s an intermediary between the containers it manages and the OS it’s running on.

In other words, the containers only have to worry about interfacing with Docker, and meanwhile, Docker only has to worry about interfacing with its host OS. So whenever a container makes some request for a given resource from the OS, it passes that request to the Docker engine, which translates it and passes it to the host OS. The host OS can then allocate that resource, either directly to the container or through Docker.

Things get a bit more crunchy if you want to dig deeper (containers do some wild stuff with filesystems and messaging to make this all work), but that’s the gist of how containers actually run using Docker.

For our purposes, it’s sufficient to say that our Dockerfiles provide instructions to Docker for building an image. That image can then be moved from machine to machine, and ultimately used to spawn running containers.

It’s also worth noting that we have two sets of Dockerfiles for WonderTix: the `Dockerfile.dev` files are for deploying to GCP, and the regular old Dockerfiles are for running locally via Docker Compose.

### cloudbuild.yaml
With our Dockerfiles providing instructions, we’re still faced with the task of actually building images from them. More than that, we have to move those images so they’re accessible to whatever service is then launching containers from them. This is where our cloudbuild.yaml files come in.

A YAML file is a set of static instructions called a declarative manifest. A manifest is distinct from, say, a script in that it specifies some desired state without saying exactly how to achieve that state. An imperative script, on the other hand, will proceed step by step and give detailed instructions for achieving a given state. Scripts are more flexible and open-ended, but they’re also more error-prone; manifests are simple, unambiguous, and less susceptible to things like runtime or programmer errors.

In our case, the `cloudbuild.yaml` files provide instructions for:

- building Docker images from our Dockerfiles
- pushing those images to GCP
- deploying containers from those images once they’re in the cloud

### Triggers

The question remains: how do we read and execute the instructions in our `cloudbuild.yaml` files, and when exactly does that occur? This step is where we finally bridge the gap from our GitHub repo to GCP.

A trigger, in this context, is a mechanism that listens for a particular kind of event and then takes a predetermined action in response. Our deployment team lead has set up two of these triggers on GCP and pointed them at the `client` and `server` directories of our GitHub repo. Depending on how we configure them, those triggers will activate whenever an authorized team member manually triggers a build, or alternatively, whenever a PR is merged onto main.

As for what our triggers actually do, it’s pretty straightforward: they look in the specified directory (either `client` or `server`) for a `cloudbuild.yaml` and then execute the instructions there.

Again, the three basic steps taken in those YAML files are building a container image, pushing it to GCP, and then deploying a running container.

### Cloud Run

It’s probably not relevant to the work of other teams, but it’s worth pointing out that we’re using Google Cloud Run to actually deploy WonderTix. Cloud Run abstracts away a lot of the networking details we would otherwise have to build out and manage. It will also automatically scale the number of deployed containers according to traffic.

### Deployment

Fair question: what do we mean by deployment, anyway?

Most generally, deployment is the process of taking software from a place like GitHub and making it available to end users.

As you can probably intuit, this involves some intermediate steps like building, testing, and running the software in question. It might be fair to expand on each of those steps in this or additional documents, because our larger CI/CD pipeline is (or will be) bigger than just deployment, but for now let’s say it’s beyond the scope of this document.

For our purposes here, deployment is either a manual or automatic act by which we take our freshly built and tested WonderTix product and run it at a publicly accessible URL by means of GCP.

### Additional documentation

- See this [document](containers-docker-kubernetes.md) for more background information on containers and Docker.
