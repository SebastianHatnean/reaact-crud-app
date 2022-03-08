import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

function Home({ isAuth }) {
  const [postsLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, 'posts');

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    };
    getPosts();
  }, [deletePost]);


  return (
    <div className="homePage">
      {postsLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <div className="deletePost">
                  <button onClick={() => deletePost(post.id)}>&#128465;</button>
                </div>
              )}
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
