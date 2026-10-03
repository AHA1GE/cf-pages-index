# Generates the pre-baked gradient JPEGs served when the Bing wallpaper
# pipeline fails. Output: src/public-static/bg-fallback-{light,dark}.jpg
Add-Type -AssemblyName System.Drawing

$w = 1280
$h = 720

function New-Canvas($base1, $base2) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $base1, $base2, 30)
    $g.FillRectangle($brush, $rect)
    return @{ Bmp = $bmp; G = $g }
}

function Add-Blob($g, $cx, $cy, $r, $color) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse($cx - $r, $cy - $r, 2 * $r, 2 * $r)
    $pb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
    $pb.CenterColor = $color
    $pb.SurroundColors = @([System.Drawing.Color]::Transparent)
    $pb.FocusScales = New-Object System.Drawing.PointF(0, 0)
    $g.FillPath($pb, $path)
}

function Save-Jpeg($bmp, $path, $quality) {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($path, $codec, $ep)
}

# Light-theme fallback: mid-tone so light glass cards keep contrast
# (matches the ~0.72 brightness the edge filter bakes into real wallpapers).
$light = New-Canvas ([System.Drawing.Color]::FromArgb(255, 98, 122, 162)) ([System.Drawing.Color]::FromArgb(255, 140, 118, 142))
Add-Blob $light.G 260 210 380 ([System.Drawing.Color]::FromArgb(115, 118, 208, 188))
Add-Blob $light.G 960 520 420 ([System.Drawing.Color]::FromArgb(115, 232, 178, 158))
Add-Blob $light.G 700 60 300 ([System.Drawing.Color]::FromArgb(95, 148, 168, 228))
Save-Jpeg $light.Bmp "$PSScriptRoot\..\src\public-static\bg-fallback-light.jpg" 72

# Dark-theme fallback: deep dusk tones (~0.5 brightness equivalent).
$dark = New-Canvas ([System.Drawing.Color]::FromArgb(255, 17, 23, 41)) ([System.Drawing.Color]::FromArgb(255, 35, 29, 51))
Add-Blob $dark.G 300 480 420 ([System.Drawing.Color]::FromArgb(125, 58, 88, 168))
Add-Blob $dark.G 1000 180 380 ([System.Drawing.Color]::FromArgb(115, 38, 118, 148))
Add-Blob $dark.G 640 620 300 ([System.Drawing.Color]::FromArgb(95, 128, 98, 158))
Save-Jpeg $dark.Bmp "$PSScriptRoot\..\src\public-static\bg-fallback-dark.jpg" 72

Write-Output "done"
