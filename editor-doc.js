const editor = document.getElementById('editor')
const file_input = document.getElementById('file_input')
const btnSalvar = document.getElementById('salvar')

file_input.addEventListener('change', () => {
  const file = file_input.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    editor.value = reader.result
  }

  reader.readAsText(file)
})

btnSalvar.addEventListener('click', () => {
  const texto = document.getElementById('editor').textContent
  const blob = new Blob([texto], { type: 'text/plain' })
  const link = document.createElement('a')

  link.download = 'arquivo_texto.txt'
  link.href = URL.createObjectURL(blob)
  link.click()
})

// voz

var gravando = false
var recognition = null

function verificaStatus() {
  if (gravando == true) {
    recognition.start()
  }
}

function iniciacao() {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SpeechRecognition()
  recognition.interimResults = true
  recognition.lang = 'pt-BR'

  var p = document.createElement('span')
  const fala = document.querySelector('.fala')
  fala.appendChild(p)

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

    p.textContent = transcript + ' '
    if (e.results[0].isFinal) {
      p = document.createElement('span')
      fala.appendChild(p)
    }
  })
  recognition.addEventListener('end', verificaStatus)
  recognition.start()
}

function checarGravacao() {
  if (gravando == true) {
    gravando = false
    recognition.stop()
    document.getElementById('btn_speech').innerHTML = 'Transcrever áudio'
  } else {
    console.log('iniciando...')
    gravando = true
    iniciacao()
    document.getElementById('btn_speech').innerHTML = 'Interromper'
  }
}

function rolaScroll() {
  const w = document.querySelector('.fala')
  w.scrollTop = w.scrollHeight
}

// ferramentas de edição

function negrito() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.toString()
    var newNode = document.createElement('b')
    newNode.appendChild(document.createTextNode(selectedText))
    range.deleteContents()
    range.insertNode(newNode)
  }
}

function italico() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.toString()
    var newNode = document.createElement('i')
    newNode.appendChild(document.createTextNode(selectedText))
    range.deleteContents()
    range.insertNode(newNode)
    var button = document.getElementById('italico-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      newNode.outerHTML = newNode.innerHTML
    } else {
      button.classList.add('active')
    }
  }
}

function left() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.extractContents()
    var container = document.createElement('div')
    container.appendChild(selectedText)
    container.style.textAlign = 'left'
    range.insertNode(container)
    var button = document.getElementById('alinhar-esquerda-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      container.style.textAlign = ''
    } else {
      button.classList.add('active')
    }
  }
}

function center() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.extractContents()
    var container = document.createElement('div')
    container.appendChild(selectedText)
    container.style.textAlign = 'center'
    range.insertNode(container)
    var button = document.getElementById('alinhar-centro-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      container.style.textAlign = ''
    } else {
      button.classList.add('active')
    }
  }
}

function right() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.extractContents()
    var container = document.createElement('div')
    container.appendChild(selectedText)
    container.style.textAlign = 'right'
    range.insertNode(container)
    var button = document.getElementById('alinhar-direita-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      container.style.textAlign = ''
    } else {
      button.classList.add('active')
    }
  }
}

function maiusculo() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.toString()
    var newNode = document.createTextNode(selectedText.toUpperCase())
    range.deleteContents()
    range.insertNode(newNode)
    var button = document.getElementById('maiusculo-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      newNode.textContent = selectedText
    } else {
      button.classList.add('active')
    }
  }
}

function minusculo() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.toString()
    var newNode = document.createTextNode(selectedText.toLowerCase())
    range.deleteContents()
    range.insertNode(newNode)
    var button = document.getElementById('minusculo-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      newNode.textContent = selectedText
    } else {
      button.classList.add('active')
    }
  }
}

function capitalizar() {
  var selection = window.getSelection()
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0)
    var selectedText = range.toString()
    var capitalizedText =
      selectedText.charAt(0).toUpperCase() + selectedText.slice(1).toLowerCase()
    var newNode = document.createTextNode(capitalizedText)
    range.deleteContents()
    range.insertNode(newNode)
    var button = document.getElementById('capitalizar-btn')
    if (button.classList.contains('active')) {
      button.classList.remove('active')
      newNode.textContent = selectedText
    } else {
      button.classList.add('active')
    }
  }
}
