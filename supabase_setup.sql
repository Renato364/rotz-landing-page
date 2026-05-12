-- Script SQL para configurar o site Rotz no Supabase

-- 1. Criar a tabela de convites (se ainda não existir)
CREATE TABLE IF NOT EXISTS public.convite_rotz (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE public.convite_rotz ENABLE ROW LEVEL SECURITY;

-- 3. Configurar Permissões de Acesso (RLS Policies)
DROP POLICY IF EXISTS "Permitir inserções públicas" ON public.convite_rotz;
CREATE POLICY "Permitir inserções públicas" 
ON public.convite_rotz 
FOR INSERT 
TO anon 
WITH CHECK (true);

DROP POLICY IF EXISTS "Visualização restrita a usuários autenticados" ON public.convite_rotz;
CREATE POLICY "Visualização restrita a usuários autenticados" 
ON public.convite_rotz 
FOR SELECT 
TO authenticated 
USING (true);

-- 4. FORÇAR ATUALIZAÇÃO DO CACHE (Resolvendo o erro PGRST205)
-- Este comando avisa a API do Supabase que o banco mudou
NOTIFY pgrst, 'reload schema';

-- 5. Garantir permissões de Schema para as chaves API
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON TABLE public.convite_rotz TO anon;
GRANT ALL ON TABLE public.convite_rotz TO authenticated;
GRANT ALL ON TABLE public.convite_rotz TO service_role;

-- 6. Adicionar um comentário simples (sem erro de sintaxe) para forçar o reconhecimento
COMMENT ON TABLE public.convite_rotz IS 'Tabela de leads do Rotz - Sincronizada';
