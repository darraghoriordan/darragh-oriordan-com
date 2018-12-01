---
title: Entering my first kaggle competition
subTitle: I did some deep learning!
category: "development"
cover: ../../../../post-default.jpg
date: "2017-02-28T17:12:33"
---

Three weeks ago I discovered the fast.ai course. They offer a practical deep learning course for coders where you get straight in to building neural networks. They provide a huge amount of support through wikis, forums, aws scripts and tooling, videos and book recommendations.

## AI competitions

The first step in this AI course is building an neural network for detecting cats and dogs in images using keras. To make this easy you use an existing model called Vgg16. Yea I had no clue what any of those things were either. There is so much information in this first lesson. It took me three weeks part-time to get through it all properly, and I still didn't go deep in to the maths.

[kaggle.com][1] is a site that lists AI competitions (with serious prize money!). Anyone can enter, but you will be up against team from Baidu, Facebook and Google 🙂 Vgg16 is a 16 layer model that won a competition in 2014 for image classification.

To do the calculations quickly you'll need a computer with a GPU. I used AWS for this. The fast.ai course has some neat scripts that set up your EC2 instance and installs Anaconda. You need to go through an approvals process to get the AWS instance with a GPU.

## Keras

Keras is a (high-level) library that sits on top of the TensorFlow or Theano libraries. It abstracts away the details of creating modular models that can easily be implemented, modified, trained and verified. It makes it easy to run your model on CPU or GPU and change the underlying deep learning library.

There is a command line tool for pulling down keras competition data.
    
    
    pip install kaggle-cli
    

You'll need to accept the T&Cs for the competition. You'll need to do a forgot password if you signed up for kaggle.com with an OAuth provider. Use this password for the kg client.

Once you have the cli you download the data for the competition from kaggle. You have to put it into folders labeled cats and dogs because vgg uses folders to classify rather than filename. You have to follow the videos for all the details.

Finally you can run the following few lines and get a 97% accuracy. And that's only from one learning epoch! This isn't a great score these days and so they go in to refining the model further to get 99%+.

https://gist.github.com/darraghoriordan/84ef21f04f9c367fdda0e57420d48ca7#file-vgg-py

## The age of applied deep learning

Ok, so I have glossed over hours of learning new things and faffing about with aws, tmux, convolutions and back propagation to name a few of the things I hadn't much experience with.

But just the fact that I can create a working model like this, trained to a specific categorization problem is something I never imagined doing. 99% of this is me using models developed by really smart people but that's what most developers do every single day. We take libraries and tools and use them to ship business value.

For the first time it really feels like AI is now part of the developer's toolkit.

get started now!… 