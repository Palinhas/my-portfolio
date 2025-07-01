-- Perfis de exemplo
insert into profiles (id, name, avatar_url, bio, website, role)
values
  ('ec8cfcde-6095-4109-9dbf-7abf11327a56', 'Carlos Bicho', 'https://randomuser.me/api/portraits/men/1.jpg', 'Dev apaixonado por React e ABAP OO', 'https://calosbicho.pt', 'admin');

-- Categorias de exemplo
insert into categories (id, name, slug, description)
values
  ('10000000-0000-0000-0000-000000000001', 'Desenvolvimento Web', 'desenvolvimento-web', 'Tudo sobre web development'),
  ('10000000-0000-0000-0000-000000000002', 'Carreira', 'carreira', 'Dicas de carreira e mercado');

-- Tags de exemplo
insert into tags (id, name, slug)
values
  ('20000000-0000-0000-0000-000000000001', 'React', 'react'),
  ('20000000-0000-0000-0000-000000000002', 'Next.js', 'nextjs'),
  ('20000000-0000-0000-0000-000000000003', 'ABAP', 'abap'),
  ('20000000-0000-0000-0000-000000000004', 'Supabase', 'supabase');

-- Posts de exemplo
insert into posts (
  id, title, slug, excerpt, content, published, featured, cover_image, reading_time, views, published_at, author_id, category_id, seo_title, seo_description, seo_image, canonical_url
) values
  (
    '30000000-0000-0000-0000-000000000001',
    'Como criar um blog profissional com Next.js e Supabase',
    'blog-nextjs-supabase',
    'Aprende a criar um blog moderno, dinâmico e escalável com Next.js e Supabase.',
    'Este é o conteúdo completo do post em Markdown...',
    true,
    true,
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    5,
    123,
    now(),
    'ec8cfcde-6095-4109-9dbf-7abf11327a56',
    '10000000-0000-0000-0000-000000000001',
    'Blog Profissional com Next.js e Supabase',
    'Guia completo para criar um blog profissional com Next.js, Supabase e React.',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://calosbicho.pt/blog/blog-nextjs-supabase'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'Dicas para evoluir na carreira de programador',
    'dicas-carreira-programador',
    'Conselhos práticos para crescer na área de desenvolvimento.',
    'Conteúdo do post sobre carreira...',
    true,
    false,
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    3,
    45,
    now(),
    'ec8cfcde-6095-4109-9dbf-7abf11327a56',
    '10000000-0000-0000-0000-000000000002',
    'Evoluir na carreira de programador',
    'Dicas essenciais para quem quer crescer como dev.',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://calosbicho.pt/blog/dicas-carreira-programador'
  );

-- Relação posts_tags
insert into posts_tags (post_id, tag_id) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001'), -- React
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002'), -- Next.js
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004'), -- Supabase
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003'); -- ABAP

-- Comentários de exemplo (todos do mesmo user)
insert into comments (id, post_id, user_id, content)
values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'ec8cfcde-6095-4109-9dbf-7abf11327a56', 'Excelente artigo! Muito útil.'),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 'ec8cfcde-6095-4109-9dbf-7abf11327a56', 'Obrigado pelas dicas!');

-- Analytics de exemplo
insert into page_views (id, post_id, page_path, user_agent, referrer)
values
  ('50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '/blog/blog-nextjs-supabase', 'Mozilla/5.0', 'https://google.com'),
  ('50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', '/blog/dicas-carreira-programador', 'Mozilla/5.0', null);

-- Social shares de exemplo
insert into social_shares (id, post_id, platform)
values
  ('60000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'linkedin'),
  ('60000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'twitter'),
  ('60000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', 'linkedin');