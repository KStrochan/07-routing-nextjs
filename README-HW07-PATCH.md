# HW07 routing patch

Розпакуй вміст цього ZIP у корінь репозиторію `07-routing-nextjs`.

Після розпакування перевір:
1. `npm install`
2. `npm run build`
3. `git add .`
4. `git commit -m "Add homework 7 routing"`
5. `git push`

Важливо:
- На Vercel має бути змінна `NEXT_PUBLIC_NOTEHUB_TOKEN`.
- Якщо у тебе залишилися старі файли `app/notes/page.tsx`, `app/notes/Notes.client.tsx`, вони будуть замінені/перенаправлені на новий маршрут `/notes/filter/all`.
- У `tsconfig.json` alias має бути `"@/*": ["./*"]`, якщо папки `app`, `components`, `lib`, `types` знаходяться у корені.
