/* ===================================================================
   JSONPlaceholder Clone — main.js
   Handles: dark mode toggle, tab switching, copy-to-clipboard
   =================================================================== */

;(function () {
  'use strict'

  // ─── Dark Mode ───────────────────────────────────────────────────
  const html = document.documentElement

  function applyTheme(dark) {
    if (dark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  // Read saved preference, fallback to OS preference
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved ? saved === 'dark' : prefersDark)

  const themeToggle = document.getElementById('theme-toggle')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark')
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
  }

  // ─── Copy-to-clipboard helper ─────────────────────────────────────
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
    }
    // Fallback for non-https
    return new Promise((resolve, reject) => {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(el)
      ok ? resolve() : reject()
    })
  }

  function showCheckIcon(btn, originalHTML) {
    btn.innerHTML = `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" style="color:var(--color-sage);width:15px;height:15px">
        <path d="M3 8.5l3 3 7-7"/>
      </svg>`
    btn.classList.add('copied-check')
    setTimeout(() => {
      btn.innerHTML = originalHTML
      btn.classList.remove('copied-check')
    }, 2000)
  }

  // ─── Copy base URL button ─────────────────────────────────────────
  const copyUrlBtn   = document.getElementById('copy-base-url')
  const urlTextEl    = document.getElementById('copy-url-text')
  const copiedLblEl  = document.getElementById('copy-url-copied-label')
  const iconCopyEl   = document.getElementById('copy-url-icon-copy')
  const iconCheckEl  = document.getElementById('copy-url-icon-check')
  const copyStatusEl = document.getElementById('copy-status')

  let copyResetTimer = null

  function setCopiedState() {
    // Text swap
    if (urlTextEl)   urlTextEl.hidden   = true
    if (copiedLblEl) copiedLblEl.hidden = false
    // Icon swap
    if (iconCopyEl)  iconCopyEl.hidden  = true
    if (iconCheckEl) iconCheckEl.hidden = false
    // Button green state
    copyUrlBtn.classList.add('copy-url-btn--copied')
    // Screen-reader announcement
    if (copyStatusEl) copyStatusEl.textContent = 'URL copied to clipboard!'
  }

  function resetCopiedState() {
    if (urlTextEl)   urlTextEl.hidden   = false
    if (copiedLblEl) copiedLblEl.hidden = true
    if (iconCopyEl)  iconCopyEl.hidden  = false
    if (iconCheckEl) iconCheckEl.hidden = true
    copyUrlBtn.classList.remove('copy-url-btn--copied')
    if (copyStatusEl) copyStatusEl.textContent = ''
  }

  function setErrorState() {
    copyUrlBtn.classList.add('copy-url-btn--error')
    if (copyStatusEl) copyStatusEl.textContent = 'Copy failed. Please copy manually.'
    setTimeout(() => {
      copyUrlBtn.classList.remove('copy-url-btn--error')
      if (copyStatusEl) copyStatusEl.textContent = ''
    }, 2500)
  }

  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', () => {
      // Prevent re-triggering while already in copied state
      if (copyResetTimer) return

      const url = copyUrlBtn.dataset.copyUrl
      copyText(url)
        .then(() => {
          setCopiedState()
          copyResetTimer = setTimeout(() => {
            resetCopiedState()
            copyResetTimer = null
          }, 2000)
        })
        .catch(() => {
          setErrorState()
        })
    })
  }

  // ─── Copy-code buttons (on each code block) ───────────────────────
  document.querySelectorAll('[data-copy-code]').forEach((btn) => {
    const originalHTML = btn.innerHTML
    btn.addEventListener('click', () => {
      // Get nearest <pre> sibling or parent's <pre>
      const wrap = btn.closest('.code-block-wrap')
      const pre  = wrap ? wrap.querySelector('pre') : null
      if (!pre) return
      copyText(pre.innerText || pre.textContent).then(() => {
        showCheckIcon(btn, originalHTML)
      })
    })
  })

  // ─── Tab system ──────────────────────────────────────────────────
  const tablist = document.querySelector('[role="tablist"]')
  if (!tablist) return

  const tabs   = Array.from(tablist.querySelectorAll('[role="tab"]'))
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('aria-controls'))
  )

  function activateTab(index) {
    tabs.forEach((tab, i) => {
      const active = i === index
      tab.setAttribute('aria-selected', String(active))
    })
    panels.forEach((panel, i) => {
      if (!panel) return
      if (i === index) {
        panel.removeAttribute('hidden')
      } else {
        panel.setAttribute('hidden', '')
      }
    })
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i))

    // Keyboard navigation (← →)
    tab.addEventListener('keydown', (e) => {
      let next = i
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End')  next = tabs.length - 1
      else return
      e.preventDefault()
      activateTab(next)
      tabs[next].focus()
    })
  })

  // Activate first tab on load
  activateTab(0)

})()
