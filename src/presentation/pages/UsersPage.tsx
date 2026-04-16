import { startTransition, useState } from 'react'

import { useComments } from '@/application/hooks/useComments'
import { usePosts } from '@/application/hooks/usePosts'
import { useUsers } from '@/application/hooks/useUsers'
import { EmptyState } from '@/presentation/components/EmptyState'
import { ErrorState } from '@/presentation/components/ErrorState'
import { Loader } from '@/presentation/components/Loader'
import { SectionCard } from '@/presentation/components/SectionCard'

export function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const usersQuery = useUsers()
  const postsQuery = usePosts(selectedUserId)
  const commentsQuery = useComments(selectedPostId)

  return (
    <div className="page-grid">
      <section className="page-header">
        <div>
          <p className="eyebrow">Users</p>
          <h1>Explore users, posts, and comments</h1>
          <p>Select a user to fetch posts, then pick a post to lazy load comments.</p>
        </div>
      </section>

      <div className="three-column-grid">
        <SectionCard title="Users" description="Remote profiles from JSONPlaceholder.">
          {usersQuery.isLoading ? <Loader label="Loading users" /> : null}
          {usersQuery.error ? <ErrorState message={usersQuery.error.message} /> : null}
          {usersQuery.data?.length ? (
            <div className="list-stack">
              {usersQuery.data.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className={selectedUserId === user.id ? 'list-card list-card--active' : 'list-card'}
                  onClick={() => {
                    startTransition(() => {
                      setSelectedUserId(user.id)
                      setSelectedPostId(null)
                    })
                  }}
                >
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <small>{user.company.name}</small>
                </button>
              ))}
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Posts" description="Posts fetched only for the active user.">
          {!selectedUserId ? (
            <EmptyState title="No user selected" message="Choose a user to load posts." />
          ) : null}
          {postsQuery.isLoading ? <Loader label="Loading posts" /> : null}
          {postsQuery.error ? <ErrorState message={postsQuery.error.message} /> : null}
          {postsQuery.data?.length ? (
            <div className="list-stack">
              {postsQuery.data.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  className={selectedPostId === post.id ? 'list-card list-card--active' : 'list-card'}
                  onClick={() => {
                    startTransition(() => {
                      setSelectedPostId(post.id)
                    })
                  }}
                >
                  <strong>{post.title}</strong>
                  <span>{post.body}</span>
                </button>
              ))}
            </div>
          ) : selectedUserId && !postsQuery.isLoading && !postsQuery.error ? (
            <EmptyState title="No posts found" message="This user has no posts in the API response." />
          ) : null}
        </SectionCard>

        <SectionCard title="Comments" description="Lazy-loaded comments for the active post.">
          {!selectedPostId ? (
            <EmptyState title="No post selected" message="Choose a post to fetch comments." />
          ) : null}
          {commentsQuery.isLoading ? <Loader label="Loading comments" /> : null}
          {commentsQuery.error ? <ErrorState message={commentsQuery.error.message} /> : null}
          {commentsQuery.data?.length ? (
            <div className="list-stack">
              {commentsQuery.data.map((comment) => (
                <article key={comment.id} className="list-card list-card--static">
                  <strong>{comment.name}</strong>
                  <span>{comment.body}</span>
                  <small>{comment.email}</small>
                </article>
              ))}
            </div>
          ) : selectedPostId && !commentsQuery.isLoading && !commentsQuery.error ? (
            <EmptyState title="No comments found" message="The selected post returned no comments." />
          ) : null}
        </SectionCard>
      </div>
    </div>
  )
}