# Sze Ying — Data Science & Analytics Portfolio

A responsive, static portfolio site designed for GitHub Pages. No build tools or dependencies are required.

## 1. Add your profile photo

Put your chosen portrait in `assets/` and name it exactly:

`profile.jpg`

The page already points to `assets/profile.jpg`. Use a clear, professional photo; a square or portrait crop works well. If your image is PNG, either convert it to JPG or change the image path in `index.html` to `assets/profile.png`.

## 2. Personalise before publishing

Search `index.html` for these placeholders and replace them:

- `YOUR_EMAIL@example.com` — your preferred public contact email.
- `https://www.linkedin.com/` — your actual LinkedIn profile URL.
- General role descriptions and dates under Great Eastern and Prudential — use the exact titles, dates and responsibilities from your CV.
- Project description — add the dissertation abstract, methods, results and GitHub/report links once you are ready to share them.
- Skills — remove anything you have not used and add relevant libraries/tools you can confidently discuss.

The content currently uses details supplied in the conversation: MSc Data Science at the University of Nottingham, Actuarial Studies at Sunway, insurance pricing experience, Great Eastern, Prudential, and the dissertation title Adaptive Geodesic Conformal Prediction. Check all details against your current CV before publishing.

## 3. Preview locally

Open `index.html` in a browser. For a local server, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 4. Publish to GitHub Pages

1. Create a repository named `portfolio` under your GitHub account `szeying-code`.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md` and the `assets` folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. After GitHub Pages finishes deploying, your site should be available at `https://szeying-code.github.io/portfolio/`.

Keep your existing résumé site at `https://szeying-code.github.io/resume/` and link between the two.

## Notes

- This is a static site; no database or backend is needed.
- Do not publish confidential employer information, customer data, or university work you do not have permission to share.
- Update the page title, description and social links if you change your public profile details.
