const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;

  if (blogs.length < 1 || blogs === undefined) {
    return likes;
  } else {
    blogs.map((blog) => {
      likes = likes + blog.likes;
    });
  }

  return likes;
};

const favoriteBlogs = (blogs) => {
  let favoriteBlog = {
    title: "Test title",
    author: "Test author",
    likes: 0,
  };

  if (blogs.length < 1 || blogs === undefined) {
    return favoriteBlog;
  }
  blogs.map((blog) => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  let authors = [];

  // Get all unique authors
  blogs.map((blog) => {
    if (authors.includes(blog.author)) {
      return;
    } else {
      authors.push(blog.author);
    }
  });

  // authors = [Masa, Jari, Kalevi]

  let authorBlogCount = authors.slice();

  // Count blogs for each author
  for (let i = 0; i < authors.length; i++) {
    let count = 0;
    blogs.map((blog) => {
      if (blog.author === authors[i]) {
        count = count + 1;
      }
    });
    authorBlogCount[i] = count;
  }

  let favoriteAuthorBlogCount = 0;

  // Count author with most blogs
  authorBlogCount.map((count) => {
    if (count > favoriteAuthorBlogCount) {
      favoriteAuthorBlogCount = count;
    }
  });

  // Find author with most blogs
  let favoriteAuthor = authors.splice(
    authorBlogCount.indexOf(favoriteAuthorBlogCount),
    1
  );

  // Create array of favorite author and their blog count
  let favorite = {
    author: favoriteAuthor[0],
    blogs: favoriteAuthorBlogCount,
  };

  return favorite;
};

const mostLikes = (blogs) => {
  let authors = [];

  blogs.map((blog) => {
    if (authors.includes(blog.author)) {
      return;
    } else {
      authors.push(blog.author);
    }
  });

  let likes = authors.slice();
  for (let i = 0; i < authors.length; i++) {
    let count = 0;
    blogs.map((blog) => {
      if (blog.author === authors[i]) {
        count = count + blog.likes;
        likes.splice([i], 1, count);
      }
    });
  }

  let maxLikes = Math.max(...likes);
  maxLikesIndex = likes.indexOf(maxLikes);
  let maxAuthor = authors.splice(maxLikesIndex, 1);

  const authorWIthMostLikes = {
    author: maxAuthor[0],
    likes: likes[maxLikesIndex],
  };

  return authorWIthMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
