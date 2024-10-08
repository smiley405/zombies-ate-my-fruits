// To save btyes,
// All the respective spritesheets ../grafx2/export/*.png 
// converted to RLE sprites using https://github.com/smiley405/RLE-sprite-editor
// using copy-as-an-Object button
// follow https://github.com/smiley405/RLE-sprite-editor on how to use
export const GridCellsX = 12;
export const GridCellsY = 12;
export const TILES = {
	w: 8,
	h: 8,
	frames: '$4A1$1A1$4A1$1A1$1A1$1A1$1A1$1A3$1A1B1$1B1A1B1$2A2B2A1B1A1$1A1B2A1B1A1B1A1B1A1B3A1B1A1B1A1B1A1B2A1|$4A1$4A1$2A1$1A1$2A1$1A1$1A2$1A1$1B1A1$1A1$2A1B1A1B1$1B1$1B1A1B2A1B1A1B1A1B1A1B1A1B1A1B4A1B1A1B1A1B1|$1A1$1A1$4A1$1A1$1A1$3A3$1A1$1A1$2B1A1B1$1B1A1$1A1B1A1B2A2$1B1A1B1A1B2A1$1B1A1B3A1B1A2B2A1B1A1B1A1|$20A1$1A1$6A2$5A1$1A2$4A1$1A2$5A1$1B1$4A1B1A1B1|$17A1$1A1$2A1$1A1$1A1$1A1$1A1$1A1$1A2$1A1$1A3$1A1$1A3$1A2B1A2$1B1A1B2A2B2A1|$17A1$1A1$4A1$1A1$6A1$1A1$5A1$1A1$4A1$1A1B1$4B1A1B1A1$4|$1C8B10C2B2C18D2C2D2C1D4C1D11|C8B8C1B2C2B1C16D1C3D2C2D1C2D15|C7$1B7C3B2C2B2C9D2C2D1C2D3C2D2C1D16|$27E1F1$6E1F1$4E5F1$4E1F1$6E1F1$3|$2F1A1$2F1$3E1$3E1$1A1E2A1F1E1A1F1$1A1F1$2A1E1$1A1$1F1A2$1F1A1$2E1$3E1$1F1E1A1F1A2E1F1$1A1F1$1A1$1F1$1|$64|D1G1D3G2D1G3D2G2D11G2D1G2D3G2D1G2D3G2D6G1D3G1D1$2D3$3|D1G1D3G2D1G3D2G3D1G2D10G1D3G2D1G3D1G3D2G1D3G1D5$3D4$2|D6G1D2G3D1G3D1G4D1G1D1G4D5G3D16$1D3$2D2$2D1$1|$3F2$5F1E3$3F1E1F4$1F1E1F1H4F2E1F1H1F2H1F2A1F2H3I1A3H1A2I2B1A1F1B1A1B2A1|$1A2$3F1$3E1A2$1A1$1F1A2E1A1F1A1F1$1A1F1A1$2E1A1$2F1$1A1$1A1$2A1E1$1A1$1F1$1A1$1E1A2$1E1A1$1A2$1A4|$64|$36G1$7G1$7G1$6G2$3|$45G1$7G1$3G1$3G1$1G1|D1G1D3G2D1G3D2G2D11G2D1G2D3G2D1G2D3G2D6G1D3G1D9|D1G1D3G2D1G3D2G3D1G2D10G1D3G2D1G3D1G3D2G1D3G1D14|D6G1D2G3D1G3D1G4D1G1D1G4D5G3D28|$64|$6F1$4F1$2F1$4F1$2F1$1F1$2F1$2F1$1F1$2F1$2F1$1F1$2F1$2F1$1F1$1F1$4F2$1F1$4F1|F1$3F1$2F2$3F1$2F2$3F1$1F3$2F1$2F2$1F1$1F1$2F2$1F1$1F1$1F3$1F1$1F1$1F3$1F1$1F1$1F3|F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$1F1$4F2$2F1$3F2$2F1$3F2$2F1$12|$64|$64|$64|$11F1$13F1$1E1$1F1$13F1$20|$12F1$7F1$5F2E1F2$5F1$7F1$19|$19F1$6F1E1F1$6F1$28|$10F1$1F1$4F1$3F1$5E1$5F1$3F1$4F1$1F1$19|$64|$64|$4F1$37F1$21|$11F1$13F1$13F1$21F1$2|$3F1$34F1$25|$25F1$21F1$16|$21F1$42|$37F1$26|$14F1$20F1$11F1$16|$52F1$11|$1F1$19F1$18F1$1F1$21|$44F1$19|$64|$23F2$39|$64|$38F1$2F1$22|$22F1E1$5E3$4E2F1E1$4E4$3F1E4$3E2F1E2|$8E3F1$4E5$3E2F2$4E1F2$5E2F1$5E2$6E2$6|$64|$64|$60F1$3|$29F1$34|$3E1F3E1$3E2F1E2$4E4$4E4$5E3$6F1E1$16|E2$6F1E1$6E3$5E2F1$5E1F3$4E2F1E2$3E4$12|$64|$64|$64|$64|$64|$64|$64|$64|$64|$64|$64|$64|$64|$64',
	palette: {'A':'#29366f','B':'#38b764','C':'#257179','D':'#5d275d','E':'#f4f4f4','F':'#94b0c2','G':'#b13e53','H':'#566c86','I':'#333c57'},
	fps: 1
};

