$pdfPath = "d:\Ayapbergenov Qadirbergen\odam-anatomiyasi_-atlas_-1-jild-n_ahmedov-2.pdf"
$outDir = "d:\Ayapbergenov Qadirbergen\extracted_pages"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir }

$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
Write-Host "Read $($bytes.Length) bytes"

$imgIndex = 0
$i = 0
while ($i -lt ($bytes.Length - 4) -and $imgIndex -lt 60) {
    # Find JPEG SOI: 0xFF, 0xD8, 0xFF
    if ($bytes[$i] -eq 0xFF -and $bytes[$i+1] -eq 0xD8 -and $bytes[$i+2] -eq 0xFF) {
        $start = $i
        $j = $start + 2
        while ($j -lt ($bytes.Length - 1)) {
            if ($bytes[$j] -eq 0xFF -and $bytes[$j+1] -eq 0xD9) {
                $end = $j + 2
                $length = $end - $start
                if ($length -gt 5000) { # filter out tiny thumbnails
                    $imgIndex++
                    $imgBytes = New-Object byte[] $length
                    [System.Array]::Copy($bytes, $start, $imgBytes, 0, $length)
                    $outPath = Join-Path $outDir ("page_{0:D3}.jpg" -f $imgIndex)
                    [System.IO.File]::WriteAllBytes($outPath, $imgBytes)
                    Write-Host "Saved $outPath ($length bytes)"
                }
                $i = $end
                break
            }
            $j++
        }
    }
    $i++
}
Write-Host "Extracted $imgIndex images"
