const cards = document.querySelectorAll('.card')
const generateBtn = document.getElementById("btn-palette-generator")

function generateColor(base, index) {
    let hue = base + Math.floor(Math.random() * 60 - 30);
    let complementary = hue + 180;
    let saturation = Math.floor(Math.random() * (90 - 50) + 50);
    let light = Math.floor(Math.random() * (80 - 30) + 30);

    if (hue > 360) {
        hue -= 360;
    } else if (hue < 0) {
        hue += 360;
    }
 
    if (complementary > 360) {
        complementary -= 360;
    } else {
        complementary;
    }

    if (index === 2 || index === 4) {
        return {
            hue: complementary,
            saturation,
            light,
            hsl: `hsl(${complementary}, ${saturation}%, ${light}%)`
        }
    } else {
        return {
            hue,
            saturation,
            light,
            hsl: `hsl(${hue}, ${saturation}%, ${light}%)`
        }
    }

}

function hslToHex(hue, saturation, light) {
    saturation = saturation / 100;
    light = light / 100;

    let chroma = 0;
    let x = 0;
    let m = 0;
    let red = 0;
    let green = 0;
    let blue = 0;
    let hex = "#"

    chroma = (1 - Math.abs(2 * light - 1)) * saturation;
    x = chroma * (1 - Math.abs(hue / 60 % 2 - 1));
    m = light - chroma/2;

    if (hue >= 0 && hue < 60) {
        red = chroma;
        green = x;
        blue = 0;
    } else if (hue >= 60 && hue < 120) {
        red = x;
        green = chroma;
        blue = 0;
    } else if (hue >= 120 && hue < 180) {
        red = 0;
        green = chroma;
        blue = x;
    } else if (hue >= 180 && hue < 240) {
        red = 0;
        green = x;
        blue = chroma;
    } else if (hue >= 240 && hue < 300) {
        red = x;
        green = 0;
        blue = chroma;
    } else if (hue >= 300 && hue < 360) {
        red = chroma;
        green = 0;
        blue = x;
    }

    red = Math.round((red + m) * 255);
    green = Math.round((green + m) * 255);
    blue = Math.round((blue + m) * 255);

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    hex = hex + red + green + blue;

    return hex;
}


function generatePalette() {
    let base = Math.floor(Math.random() * 360)
    let index = 0;

    cards.forEach(card => {
        index++;
        const color = generateColor(base, index);
    
        card.style.backgroundColor = color.hsl; 
        const hex = card.querySelector(".hex");
        hex.style.setProperty("--text-color", color.hsl);
        hex.textContent = hslToHex(color.hue, color.saturation, color.light).toUpperCase();
        
        card.addEventListener('click', () => {
            const hexColor = hex.textContent;
            navigator.clipboard.writeText(hex.textContent);
            hex.textContent = "Copiado!"
            setTimeout(() => {
                hex.textContent = hexColor
            }, 1500);
        })
    });
}

generateBtn.addEventListener('click', () => {
    generatePalette();
})

document.addEventListener('keydown', (event) => {
    if (event.key === "Space") {
        generatePalette();
    }
})
