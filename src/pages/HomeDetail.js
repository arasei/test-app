import React from 'react';
import { posts } from '../data/posts';
import { useParams } from 'react-router-dom';
import classes from '../css/Detail.module.css'

export const HomeDetail = () => {
  //react-routerのuseParamsで、URLのパラメーターを取得する。  
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>記事が見つかりません</div>
  }

  return (
    <div className={classes.Container}>
        <div className={classes.post}>
          <div className={classes.postImage}>
            <img src={post.thumbnailUrl} alt=""/>
          </div>
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
                  )
                })}
              </div>
            </div>
            <div className={classes.postTitle}>{post.title}</div>
            <div className={classes.postBody}dangerouslySetInnerHTML={{ __html: post.content }}/>
          </div>
        </div>
    </div>
  );
};
