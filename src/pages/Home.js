import React from 'react';
import classes from '../css/Home.module.css';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts'

export const Home = () => {
  return (
    <div className="">
      <div className={classes.container}>
        <ul>
          {/*記事の一覧をmap処理で繰り返す*/}
          {posts.map((post) => {
            return (
              <li key={post.id} className={classes.list}>
                <Link to={`/posts/${post.id}`} className={classes.link}>
                  <div className={classes.post}>
                    <div className={classes.postContent}>
                      <div className={classes.postInfo}>
                        <div className={classes.postDate}>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className={classes.postCategories}>
                          {post.categories.map((category) => {
                            return (
                              <div key={category} className={classes.postCategory}>
                                {category}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <p className={classes.postTitle}>{post.title}</p>
                      <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}