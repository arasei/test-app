import React from 'react';
import classes from '../css/Home.module.css';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts'

export const Home = () => {
    return (
        <div>
            <div className={classes.container}>
                <ul>
                    {/* mapメソッドで記事データを取得し、繰り返し表示*/}
                    {posts.map((post) => {
                        return (
                            <li key={post.id} className={classes.postList}>
                                <Link to={`/posts/${post.id}`} className={classes.postLink}>
                                    <div className="postWhole">
                                        {/* newDate()で現在の日付を返して、toLocaleDateString()で文字列として指定して表示する*/}
                                        <div className={classes.postDate}>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className={classes.postCategories}>
                                            {/*カテゴリーをmapメソッドで取得し表示する*/}
                                            {post.categories.map((category) => {
                                                return (
                                                    <div key={category}
                                                    className={classes.postCategory}>
                                                        {category}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <p className={classes.postTitle}></p>
                                    {/* Reactでhtmlを直接描画するためにdangerouslySetInnerHTMLを使用*/}
                                    <div className={classes.postBody}dangerouslySetInnerHTML={{__html:post.content}}/>
                                </Link>
                            </li>
                        )
                    })} 
                </ul>
            </div>
        </div>
    )
}