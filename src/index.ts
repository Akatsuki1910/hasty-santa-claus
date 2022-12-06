const file = document.getElementById('file') as HTMLInputElement
const button = document.getElementById('button') as HTMLButtonElement
button.disabled = true

const x2 = new Image()
x2.style.imageRendering = 'pixelated'

let x1Text = ''
let x2Text = ''

file!.onchange = () => {
  button.disabled = true

  const file = document.getElementById('file') as HTMLInputElement

  const f = file.files![0]

  const reader = new FileReader()
  reader.onload = (e: ProgressEvent) => {
    const base64Text = (e.currentTarget as FileReader).result

    if (typeof base64Text === 'string') {
      x1Text = base64Text
      x2.onload = () => {
        x2Text = ImageToBase64(x2)
        button.disabled = false
      }
      x2.src = base64Text
    }
  }
  reader.readAsDataURL(f)
}

button.onclick = () => {
  navigator.clipboard.writeText(
    `document.getElementById('offline-resources-1x').src="${x1Text}";document.getElementById('offline-resources-2x').src="${x2Text}";`,
  )
}

function ImageToBase64(img: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width * 2
  canvas.height = img.height * 2
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return canvas.toDataURL()
}
